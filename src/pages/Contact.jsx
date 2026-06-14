import { motion } from 'framer-motion'
import { MapPin, Clock, Navigation, Phone } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import brand from '../data/brand.json'

export default function Contact() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-stone-900 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Visit Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-3"
          >
            Find Nandoos Garments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-stone-400 text-sm sm:text-base max-w-md mx-auto"
          >
            We're easy to reach in the heart of Thodupuzha, near Municipal Park.
          </motion.p>
        </div>
      </section>

      {/* Map + Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Map */}
          <SectionReveal>
            <div className="rounded-2xl overflow-hidden shadow-lg h-80 sm:h-[420px] w-full">
              <iframe
                src="https://maps.google.com/maps?q=Karottumadam+Building,Temple+Bypass+Road,Thodupuzha,Kerala+685584&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nandoos Garments Location"
              />
            </div>
          </SectionReveal>

          {/* Contact Info */}
          <SectionReveal delay={0.15}>
            <div className="space-y-8 pt-2">
              <div>
                <h2 className="font-heading text-2xl font-bold text-stone-800 mb-0.5">
                  Nandoos Garments
                </h2>
                <p className="text-amber-600 text-sm font-medium">നന്ദുസ് ഗാർമെൻ്റ്സ്</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1.5 text-sm">Address</h3>
                  <address className="not-italic text-stone-600 text-sm leading-relaxed">
                    Ground Floor, Karottumadam Building<br />
                    Temple Bypass Road, near Municipal Park<br />
                    Thodupuzha, Kerala 685584
                  </address>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-2 text-sm">Store Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-24 text-stone-500 shrink-0">Monday</span>
                      <span className="text-stone-700 font-medium">9:30 AM onwards</span>
                    </div>
                    {/* TODO: client to provide full weekly hours */}
                    <p className="text-xs text-stone-400 italic pt-1">
                      Full weekly hours not yet confirmed. Please check Google Maps or visit in-store.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone — hidden until confirmed */}
              {brand.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1 text-sm">Phone</h3>
                    <a
                      href={`tel:${brand.phone}`}
                      className="text-primary text-sm font-medium hover:text-primary-dark transition-colors"
                    >
                      {brand.phone}
                    </a>
                  </div>
                </div>
              )}
              {/* TODO: Add phone link once number is confirmed */}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://maps.google.com/?q=VPX6%2BGW+Thodupuzha,+Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm"
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
                <div className="inline-flex items-center justify-center px-6 py-3 border border-stone-200 text-stone-500 rounded-xl text-sm bg-white">
                  {/* TODO: Replace with phone link once number is provided */}
                  Call us in-store
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* How to find us */}
      <section className="bg-amber-50 border-t border-amber-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <SectionReveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-800 mb-4">
            Easy to Find
          </h2>
          <p className="text-stone-600 leading-relaxed">
            We're located on Temple Bypass Road, in the Karottumadam Building, just near the Municipal Park in Thodupuzha. Look for us on the ground floor — you can also search <strong>VPX6+GW</strong> in Google Maps to navigate directly to our doorstep.
          </p>
        </SectionReveal>
      </section>
    </main>
  )
}
