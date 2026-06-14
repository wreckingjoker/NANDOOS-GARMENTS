import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavorites } from '../context/FavoritesContext'
import ProductCard from '../components/ProductCard'
import SectionReveal from '../components/SectionReveal'

export default function Favorites() {
  const { favorites, toggle } = useFavorites()

  return (
    <main>
      {/* Hero */}
      <section className="bg-stone-900 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 mb-5"
          >
            <Heart size={26} className="text-red-400" fill="currentColor" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-3"
          >
            Your Favourites
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-stone-400 text-sm sm:text-base"
          >
            {favorites.length > 0
              ? `${favorites.length} item${favorites.length === 1 ? '' : 's'} saved`
              : 'Items you heart will appear here'}
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {favorites.length === 0 ? (
          /* Empty state */
          <SectionReveal className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-amber-400" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-stone-700 mb-3">
              No favourites yet
            </h2>
            <p className="text-stone-500 text-sm max-w-xs mb-8">
              Tap the heart on any product to save it here for later.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm"
            >
              Browse Collections
            </Link>
          </SectionReveal>
        ) : (
          <>
            {/* Group by category */}
            {Object.entries(
              favorites.reduce((acc, item) => {
                ;(acc[item.category] = acc[item.category] || []).push(item)
                return acc
              }, {})
            ).map(([category, items]) => (
              <div key={category} className="mb-14">
                <SectionReveal className="mb-6 flex items-baseline justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-stone-800">{category}</h2>
                    <p className="text-stone-500 text-sm mt-0.5">{items.length} saved</p>
                  </div>
                </SectionReveal>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {items.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      category={product.category}
                      image={product.image}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            ))}

            <SectionReveal className="mt-4 text-center">
              <button
                onClick={() => {
                  if (window.confirm('Remove all favourites?')) {
                    favorites.forEach((p) => toggle(p))
                  }
                }}
                className="text-sm text-stone-400 hover:text-red-500 transition-colors underline underline-offset-2"
              >
                Clear all favourites
              </button>
            </SectionReveal>
          </>
        )}
      </section>
    </main>
  )
}
