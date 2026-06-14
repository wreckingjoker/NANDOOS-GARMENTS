import { Link } from 'react-router-dom'
import { Home, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import SectionReveal from '../components/SectionReveal'
import brand from '../data/brand.json'

export default function LadiesWear() {
  const products = brand.products.ladies

  return (
    <main>
      {/* Category Hero */}
      <section className="relative h-64 sm:h-80 flex items-end overflow-hidden">
        {/* TODO: Replace with real ladies wear category image */}
        <img
          src="https://picsum.photos/seed/ladies-hero/1920/640"
          alt="Ladies' Wear collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/40 to-stone-900/10" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
          <nav className="flex items-center gap-1.5 text-xs text-stone-300 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <Home size={11} /> Home
            </Link>
            <ChevronRight size={11} />
            <span className="text-white font-medium">Ladies' Wear</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white"
          >
            Ladies' Wear
          </motion.h1>
          <p className="text-stone-300 mt-2 text-sm sm:text-base">
            Sarees, kurtis, churidars and more for every occasion
          </p>
        </div>
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
              category="Ladies' Wear"
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
