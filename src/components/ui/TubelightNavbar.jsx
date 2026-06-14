import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MapPin, Home, Users, Heart, Star, Shirt, Info, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Home',          url: '/',                 icon: Home  },
  { name: "Kids' Wear",    url: '/kids-wear',        icon: Users },
  { name: "Ladies' Wear",  url: '/ladies-wear',      icon: Heart },
  { name: 'Traditional',   url: '/traditional-wear', icon: Star  },
  { name: "Men's Wear",    url: '/mens-wear',        icon: Shirt },
  { name: 'About',         url: '/about',            icon: Info  },
  { name: 'Contact',       url: '/contact',          icon: Phone },
]

// Trimmed set for the bottom pill — keeps it fitting 320 px screens
const pillItems = navItems.slice(0, 5)

function getActive(pathname) {
  if (pathname === '/') return 'Home'
  const match = navItems.find(item => item.url !== '/' && pathname.startsWith(item.url))
  return match ? match.name : 'Home'
}

export default function TubelightNavbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState(() => getActive(location.pathname))

  useEffect(() => {
    setActiveTab(getActive(location.pathname))
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Top header bar ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-500 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.6)]'
            : 'bg-white/20 backdrop-blur-xl border-b border-white/20 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.3)]'
        }`}
      >
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
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 bg-stone-50/80 border border-stone-200/80 py-1 px-1 rounded-full shadow-sm"
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
                      {/* Lamp points downward — top navbar */}
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

          {/* Right: Directions CTA + hamburger */}
          <div className="flex items-center gap-2 shrink-0">
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
              className="lg:hidden overflow-hidden bg-white/80 backdrop-blur-xl border-t border-white/30"
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

      {/* ── Mobile bottom pill (lg hidden) ─────────────────────────── */}
      {/* Shows 5 core items so it fits 320 px screens */}
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
                    {/* Lamp points upward — bottom pill */}
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-t-full">
                      <div className="absolute w-10 h-5 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-6 h-4 bg-primary/20 rounded-full blur-sm -top-1" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
