import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/kids-wear', label: "Kids' Wear" },
  { to: '/ladies-wear', label: "Ladies' Wear" },
  { to: '/traditional-wear', label: 'Traditional' },
  { to: '/mens-wear', label: "Men's Wear" },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-amber-100'
          : 'bg-white border-b border-amber-100/60'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col leading-tight shrink-0"
          onClick={() => setOpen(false)}
        >
          <span className="font-heading text-lg sm:text-xl font-bold text-primary">
            Nandoos Garments
          </span>
          <span className="text-[11px] text-secondary font-medium tracking-wide">
            നന്ദുസ് ഗാർമെൻ്റ്സ്
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary bg-amber-50'
                      : 'text-stone-600 hover:text-primary hover:bg-amber-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA + burger */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://maps.google.com/?q=VPX6%2BGW+Thodupuzha,+Kerala"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            <MapPin size={14} />
            Directions
          </a>
          <button
            className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-primary hover:bg-amber-50 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-amber-100"
          >
            <ul className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-primary bg-amber-50'
                          : 'text-stone-700 hover:text-primary hover:bg-amber-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <a
                  href="https://maps.google.com/?q=VPX6%2BGW+Thodupuzha,+Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
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
  )
}
