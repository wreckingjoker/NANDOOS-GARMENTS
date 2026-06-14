import { motion } from 'framer-motion'
import { Shield, Users, Gem, Star } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import StarRating from '../components/StarRating'
import brand from '../data/brand.json'

const VALUES = [
  {
    icon: Shield,
    label: 'Economical Pricing',
    desc: 'We believe every family deserves access to quality clothing without stretching the budget.',
  },
  {
    icon: Users,
    label: 'Family First',
    desc: 'From newborns to grandparents, our collections serve every member of the family.',
  },
  {
    icon: Gem,
    label: 'Authentic Craftsmanship',
    desc: 'Our Kuthampully dhotis are sourced directly from traditional weavers, ensuring genuine quality.',
  },
  {
    icon: Star,
    label: 'Trusted by Thodupuzha',
    desc: 'A store the local community has come to rely on for everyday and festive clothing alike.',
  },
]

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        {/* TODO: Replace with real store exterior photo */}
        <img
          src="https://picsum.photos/seed/about-hero/1920/640"
          alt="Nandoos Garments store"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/65" />
        <div className="relative z-10 text-center px-4 pt-8">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-2"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-stone-300 text-sm sm:text-base"
          >
            The heart of family fashion in Thodupuzha
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <SectionReveal>
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Our Story
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800 mb-8 leading-tight">
            Dressing Thodupuzha with Care and Affordability
          </h2>
          <div className="space-y-5 text-stone-600 leading-relaxed text-base sm:text-lg">
            <p>
              Nandoos Garments (നന്ദുസ് ഗാർമെൻ്റ്സ്) is a beloved clothing store nestled in the heart of Thodupuzha, Kerala — located at the Ground Floor of Karottumadam Building on Temple Bypass Road, just steps from the Municipal Park.
            </p>
            <p>
              We believe that great clothing shouldn't break the bank. Our mission is simple: bring affordable, quality fashion to every family in Thodupuzha and the surrounding regions. Whether you're shopping for your children, looking for the perfect saree, or seeking an authentic Kuthampully dhoti for a special occasion, we have something for everyone.
            </p>
            <p>
              Our speciality lies in our carefully curated collection of traditional Kerala dhotis sourced from Kuthampully — the weaving capital of Kerala — alongside a wide range of everyday and festive clothing for kids, ladies, and men.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Values */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">
              What We Stand For
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800">
              Our Values
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((item, i) => (
              <SectionReveal key={item.label} delay={i * 0.1}>
                <div className="group text-center p-7 rounded-2xl bg-amber-50 hover:bg-amber-100/70 transition-colors">
                  <div className="w-[52px] h-[52px] bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
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

      {/* Rating section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <SectionReveal className="max-w-xl mx-auto text-center">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-6">
            Customer Rating
          </p>
          <div className="inline-flex flex-col items-center gap-4 p-10 bg-white rounded-3xl shadow-sm border border-stone-100">
            <StarRating rating={4} size={32} />
            <span className="font-heading text-6xl font-bold text-stone-800 leading-none">
              {brand.rating.toFixed(1)}
            </span>
            <span className="text-stone-500 text-sm">
              Based on {brand.review_count} Google Reviews
            </span>
            <a
              href="https://maps.google.com/?q=VPX6%2BGW+Thodupuzha,+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-primary hover:text-primary-dark transition-colors font-medium"
            >
              See reviews on Google Maps →
            </a>
          </div>
        </SectionReveal>
      </section>
    </main>
  )
}
