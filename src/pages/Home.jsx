import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, ChevronDown, Shield, Users, Gem, Star } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import CategoryCard from '../components/CategoryCard'
import TestimonialV2 from '../components/ui/TestimonialV2'
import brand from '../data/brand.json'

const CATEGORY_META = {
  'Kids Wear': {
    to: '/kids-wear',
    image: '/images/kids-wear.png',
    description: 'Colorful, durable clothing for little ones',
    objectPosition: 'top',
  },
  'Ladies Wear': {
    to: '/ladies-wear',
    image: '/images/ladies-saree.png',
    description: 'Sarees, kurtis, churidars & more',
  },
  'Traditional Wear (Dhotis)': {
    to: '/traditional-wear',
    image: '/images/boy-shirt.png',
    description: 'Authentic Kuthampully dhotis & Kerala traditional',
    displayName: 'New Arrival',
    objectPosition: 'top',
  },
  "Men's Wear": {
    to: '/mens-wear',
    image: '/images/men-dhotis.png',
    description: 'Formal, casual & ethnic wear for men',
    objectPosition: 'top',
  },
}

const SPECIALTIES = [
  {
    icon: Shield,
    label: 'Economical Pricing',
    desc: 'Quality clothing at prices that work for every family in Thodupuzha.',
  },
  {
    icon: Users,
    label: 'Wide Variety',
    desc: 'Collections for kids, ladies, men, and all age groups under one roof.',
  },
  {
    icon: Gem,
    label: 'Kuthampully Dhotis',
    desc: 'Authentic traditional dhotis sourced directly from Kuthampully weavers.',
  },
  {
    icon: Star,
    label: 'All Age Groups',
    desc: 'From newborns to adults — we dress the whole family with care.',
  },
]

export default function Home() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <picture className="absolute inset-0 w-full h-full">
          {/* Portrait crop for mobile */}
          <source media="(max-width: 639px)" srcSet="/images/nandoos-family-cover-mobile.png" />
          {/* Wide cover for tablet and desktop */}
          <img
            src="/images/nandoos-family-cover.png"
            alt="Nandoos Garments Thodupuzha"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        {/* Mobile: centre-darkened overlay; Desktop: left-clear → right-dark */}
        <div className="absolute inset-0 bg-stone-900/50 sm:bg-transparent" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-stone-900/10 via-stone-900/40 to-stone-900/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 flex justify-end"
        >
          <div className="w-full sm:max-w-lg lg:max-w-xl text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-amber-300 text-xl sm:text-2xl font-medium tracking-wider mb-3 drop-shadow"
          >
            നന്ദൂസ് ഗാർമെൻ്റ്സ്
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.65 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
          >
            Quality Clothing for Every Occasion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-stone-200 text-base sm:text-lg mb-8 leading-relaxed"
          >
            Economical prices · Wide variety · Thodupuzha's trusted family clothing store
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-3"
          >
            <Link
              to="/kids-wear"
              className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm sm:text-base shadow-lg shadow-primary/30"
            >
              Explore Collections
            </Link>
            <a
              href="https://maps.google.com/?q=VPX6%2BGW+Thodupuzha,+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              <MapPin size={16} />
              Get Directions
            </a>
          </motion.div>

          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-10 inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5"
          >
            <div className="flex">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
              <Star size={13} className="fill-stone-400 text-stone-400" />
            </div>
            <span className="text-white text-sm font-medium">
              4.0 · {brand.review_count} Google Reviews
            </span>
          </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown size={26} />
        </motion.div>
      </section>

      {/* ── Shop by Category ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">
            Collections
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800 mb-3">
            Shop by Category
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Find the perfect clothing for every member of your family
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {brand.categories.map((cat, i) => {
            const meta = CATEGORY_META[cat]
            return (
              <CategoryCard
                key={cat}
                name={meta.displayName ?? cat}
                description={meta.description}
                image={meta.image}
                to={meta.to}
                index={i}
                objectPosition={meta.objectPosition}
              />
            )
          })}
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">
              Our Promise
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800 mb-3">
              Why Choose Nandoos?
            </h2>
            <p className="text-stone-500 max-w-md mx-auto">
              Thodupuzha's trusted family clothing store
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPECIALTIES.map((item, i) => (
              <SectionReveal key={item.label} delay={i * 0.1}>
                <div className="group text-center p-7 rounded-2xl bg-amber-50 hover:bg-amber-100/70 transition-colors">
                  <div className="w-13 h-13 w-[52px] h-[52px] bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-stone-800 mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <TestimonialV2 />

      {/* ── Location Preview ──────────────────────────────────────────── */}
      <section className="bg-stone-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionReveal>
              <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
                Find Us
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5">
                Visit Our Store in Thodupuzha
              </h2>
              <p className="text-stone-400 mb-7 leading-relaxed">
                Conveniently located near Municipal Park on Temple Bypass Road. Drop in anytime — our team is always happy to help you find the right outfit.
              </p>
              <div className="flex items-start gap-3 mb-8">
                <MapPin size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <address className="not-italic text-stone-300 text-sm leading-relaxed">
                  Ground Floor, Karottumadam Building, Temple Bypass Road,
                  near Municipal Park, Thodupuzha, Kerala 685584
                </address>
              </div>
              <a
                href="https://maps.google.com/?q=VPX6%2BGW+Thodupuzha,+Kerala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm"
              >
                <MapPin size={16} />
                Open in Google Maps
              </a>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="rounded-2xl overflow-hidden h-72 lg:h-[420px] shadow-xl">
                <iframe
                  src="https://maps.google.com/maps?q=Karottumadam+Building,Temple+Bypass+Road,Thodupuzha,Kerala+685584&output=embed&z=16"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nandoos Garments on Google Maps"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className="bg-primary py-14 px-4 sm:px-6 lg:px-8">
        <SectionReveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Dress the Whole Family
          </h2>
          <p className="text-amber-100 mb-8 text-base sm:text-lg leading-relaxed">
            Kids' wear, ladies' collections, traditional dhotis, and men's clothing — all at economical prices, all under one roof.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/kids-wear"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-amber-50 transition-colors text-sm sm:text-base"
            >
              Browse Collections
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-3.5 border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              Our Story
            </Link>
          </div>
        </SectionReveal>
      </section>
    </main>
  )
}
