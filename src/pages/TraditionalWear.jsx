import { Link } from 'react-router-dom'
import { Home, ChevronRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import SectionReveal from '../components/SectionReveal'
import brand from '../data/brand.json'

export default function TraditionalWear() {
  const products = brand.products.traditional

  return (
    <main>
      {/* Category Hero */}
      <section className="relative h-64 sm:h-80 flex items-end overflow-hidden">
        {/* TODO: Replace with real traditional wear / Kerala dhoti image */}
        <img
          src="https://picsum.photos/seed/trad-hero/1920/640"
          alt="Traditional Wear — Kerala Dhotis"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/45 to-stone-900/10" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
          <nav className="flex items-center gap-1.5 text-xs text-stone-300 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <Home size={11} /> Home
            </Link>
            <ChevronRight size={11} />
            <span className="text-white font-medium">Traditional Wear</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white"
          >
            Traditional Wear
          </motion.h1>
          <p className="text-stone-300 mt-2 text-sm sm:text-base">
            Authentic Kerala dhotis & traditional clothing
          </p>
        </div>
      </section>

      {/* Kuthampully Highlight */}
      <section className="bg-amber-50 border-b border-amber-100">
        <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles size={26} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-800 mb-2">
                Authentic Dhotis from Kuthampully
              </h2>
              <p className="text-stone-600 leading-relaxed max-w-2xl">
                Kuthampully, a small weaving village in Kerala, is renowned across India for its exquisite handwoven dhotis and sarees. At Nandoos Garments, we stock a curated selection of genuine Kuthampully dhotis — celebrated for their fine cotton, pure kasavu (golden) borders, and enduring quality. Perfect for Onam, weddings, and daily traditional wear.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionReveal className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-stone-800">All Products</h2>
          <p className="text-stone-500 text-sm mt-0.5">{products.length} items available</p>
        </SectionReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              name={product.name}
              category="Traditional Wear"
              image={product.image}
              index={i}
            />
          ))}
        </div>

        <SectionReveal className="mt-14 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-primary transition-colors font-medium"
          >
            ← Back to All Collections
          </Link>
        </SectionReveal>
      </section>
    </main>
  )
}
