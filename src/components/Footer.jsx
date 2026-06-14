import { Link } from 'react-router-dom'
import { MapPin, Clock, ExternalLink, Phone, MessageCircle, Settings2 } from 'lucide-react'
import brand from '../data/brand.json'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-28 lg:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-white mb-1">Nandoos Garments</h3>
            <p className="text-amber-400 text-sm mb-5">നന്ദൂസ് ഗാർമെൻ്റ്സ്</p>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              Your trusted clothing store in Thodupuzha — affordable fashion for the whole family since we opened our doors.
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-amber-400" />
              Location
            </h4>
            <address className="not-italic text-sm leading-relaxed text-stone-400">
              Ground Floor, Karottumadam Building<br />
              Temple Bypass Road, near Municipal Park<br />
              Thodupuzha, Kerala 685584
            </address>
            <a
              href="https://maps.google.com/?q=VPX6%2BGW+Thodupuzha,+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
            >
              Open in Google Maps <ExternalLink size={12} />
            </a>
            {brand.phone && (
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={`tel:+91${brand.phone}`}
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-400 text-sm transition-colors"
                >
                  <Phone size={13} /> +91 {brand.phone}
                </a>
                {brand.whatsapp && (
                  <a
                    href={`https://wa.me/${brand.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                  >
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Clock size={16} className="text-amber-400" />
              Store Hours
            </h4>
            <div className="text-sm text-stone-400 space-y-1.5">
              <div className="flex justify-between gap-6 text-stone-300">
                <span>Monday</span>
                <span>9:30 AM onwards</span>
              </div>
              {/* TODO: client to provide full weekly hours */}
              <p className="text-xs text-stone-500 italic pt-1">
                Full weekly hours not yet confirmed — please check Google Maps or visit in-store.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-500">
          <span>© {year} Nandoos Garments, Thodupuzha. All rights reserved.</span>
          <nav className="flex gap-5 items-center">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-stone-300 transition-colors">
                {l.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="hover:text-stone-400 transition-colors opacity-40 hover:opacity-70"
              aria-label="Admin"
            >
              <Settings2 size={13} />
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
