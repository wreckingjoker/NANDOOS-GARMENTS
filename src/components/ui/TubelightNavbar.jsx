import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MapPin, Home, Users, Heart, Star, Shirt, Info, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFavorites } from '../../context/FavoritesContext'

const navItems = [
  { name: 'Home',          url: '/',                 icon: Home  },
  { name: "Kids' Wear",    url: '/kids-wear',        icon: Users },
  { name: "Ladies' Wear",  url: '/ladies-wear',      icon: Heart },
  { name: 'Traditional',   url: '/traditional-wear', icon: Star  },
  { name: "Men's Wear",    url: '/mens-wear',        icon: Shirt },
  { name: 'About',         url: '/about',            icon: Info  },
  { name: 'Contact',       url: '/contact',          icon: Phone },
]

const pillItems = navItems.slice(0, 5)

function getActive(pathname) {
  if (pathname === '/') return 'Home'
  if (pathname === '/favorites') return 'Favourites'
  const match = navItems.find(item => item.url !== '/' && pathname.startsWith(item.url))
  return match ? match.name : 'Home'
}

export default function TubelightNavbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(() => getActive(location.pathname))
  const { favorites } = useFavorites()

  useEffect(() => {
    setActiveTab(getActive(location.pathname))
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* ── Top header bar ─────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-lg shadow-amber-900/5" style={{ background: 'linear-gradient(135deg, rgba(255,251,235,0.45) 0%, rgba(255,255,255,0.25) 50%, rgba(255,251,235,0.45) 100%)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-tight shrink-0 min-w-0">
            <span className="font-heading text-base sm:text-lg lg:text-xl font-bold text-primary truncate">
              Nandoos Garments
            </span>
            <span className="text-[10px] sm:text-[11px] text-secondary font-medium tracking-wide">
              നന്ദൂസ് ഗാർമെൻ്റ്സ്
            </span>
          </Link>

          {/* ── Tubelight pill — desktop lg+ ─────────────────────── */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 bg-white/70 border border-amber-200/70 py-1 px-1 rounded-full shadow-sm shadow-amber-100/60 backdrop-blur-sm"
            style={{ overflow: 'visible' }}
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.name
              return (
                <Link
                  key={item.name}
                  to={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={`relative text-sm font-medium px-4 py-1.5 rounded-full transition-colors whitespace-nowrap z-10
                    ${isActive ? 'text-primary' : 'text-stone-600 hover:text-primary'}`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 bg-primary/5 rounded-full -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full">
                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md top-0 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right: Favourites heart + Directions + hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Favourites icon with badge */}
            <Link
              to="/favorites"
              aria-label="Favourites"
              className="relative p-2 rounded-lg text-stone-500 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Heart size={18} strokeWidth={2} fill={favorites.length > 0 ? 'currentColor' : 'none'} className={favorites.length > 0 ? 'text-red-500' : ''} />
              <AnimatePresence>
                {favorites.length > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
                  >
                    {favorites.length > 99 ? '99+' : favorites.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <a
              href="https://maps.google.com/?q=VPX6%2BGW+Thodupuzha,+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <MapPin size={14} />
              <span className="hidden sm:inline">Directions</span>
            </a>
            <button
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-primary hover:bg-amber-50 transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile hamburger drawer ──────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-amber-50/95 backdrop-blur-md border-t border-amber-200/60"
            >
              <ul className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.name
                  return (
                    <li key={item.url}>
                      <Link
                        to={item.url}
                        onClick={() => setActiveTab(item.name)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                          ${isActive
                            ? 'text-primary bg-amber-50'
                            : 'text-stone-700 hover:text-primary hover:bg-amber-50'
                          }`}
                      >
                        <Icon size={16} className={isActive ? 'text-primary' : 'text-stone-400'} />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
                {/* Favourites in drawer */}
                <li>
                  <Link
                    to="/favorites"
                    onClick={() => { setActiveTab('Favourites'); setOpen(false) }}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                      ${activeTab === 'Favourites'
                        ? 'text-red-500 bg-red-50'
                        : 'text-stone-700 hover:text-red-500 hover:bg-red-50'
                      }`}
                  >
                    <Heart size={16} className={activeTab === 'Favourites' ? 'text-red-500' : 'text-stone-400'} fill={favorites.length > 0 ? 'currentColor' : 'none'} />
                    Favourites
                    {favorites.length > 0 && (
                      <span className="ml-auto text-[11px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-full leading-none">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="pt-2 pb-1">
                  <a
                    href="https://maps.google.com/?q=VPX6%2BGW+Thodupuzha,+Kerala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <MapPin size={14} />
                    Get Directions
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile bottom pill ─────────────────────────────────────── */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden">
        <div
          className="flex items-center gap-0.5 bg-white/95 border border-stone-200 backdrop-blur-lg py-1 px-1 rounded-full shadow-xl"
          style={{ overflow: 'visible' }}
        >
          {pillItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={`relative p-2.5 sm:p-3 rounded-full transition-colors
                  ${isActive ? 'text-primary' : 'text-stone-400 hover:text-primary'}`}
                aria-label={item.name}
              >
                <Icon size={18} strokeWidth={2} />
                {isActive && (
                  <motion.div
                    layoutId="lamp-mobile"
                    className="absolute inset-0 bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-t-full">
                      <div className="absolute w-10 h-5 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-6 h-4 bg-primary/20 rounded-full blur-sm -top-1" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
          {/* Favourites pill item */}
          <Link
            to="/favorites"
            onClick={() => setActiveTab('Favourites')}
            className={`relative p-2.5 sm:p-3 rounded-full transition-colors
              ${activeTab === 'Favourites' ? 'text-red-500' : 'text-stone-400 hover:text-red-500'}`}
            aria-label="Favourites"
          >
            <Heart size={18} strokeWidth={2} fill={favorites.length > 0 ? 'currentColor' : 'none'} />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 min-w-[14px] h-3.5 px-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {favorites.length > 9 ? '9+' : favorites.length}
              </span>
            )}
            {activeTab === 'Favourites' && (
              <motion.div
                layoutId="lamp-mobile"
                className="absolute inset-0 bg-red-500/5 rounded-full -z-10"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-red-500 rounded-t-full">
                  <div className="absolute w-10 h-5 bg-red-500/20 rounded-full blur-md -top-2 -left-2" />
                  <div className="absolute w-6 h-4 bg-red-500/20 rounded-full blur-sm -top-1" />
                </div>
              </motion.div>
            )}
          </Link>
        </div>
      </div>
    </>
  )
}
