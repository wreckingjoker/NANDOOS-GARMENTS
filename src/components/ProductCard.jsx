import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

export default function ProductCard({ name, category, image, index = 0 }) {
  const id = `${category}-${name}`
  const { toggle, isFavorite } = useFavorites()
  const liked = isFavorite(id)

  function handleLike(e) {
    e.preventDefault()
    e.stopPropagation()
    toggle({ id, name, category, image })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        {/* TODO: Replace with real product photo */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Heart button */}
        <button
          onClick={handleLike}
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors
            ${liked
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-stone-400 hover:text-red-500 hover:bg-white'
            }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={liked ? 'liked' : 'unliked'}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              <Heart
                size={15}
                strokeWidth={2}
                fill={liked ? 'currentColor' : 'none'}
              />
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <div className="p-4">
        <span className="inline-block text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full mb-2 tracking-wide uppercase">
          {category}
        </span>
        <h3 className="text-sm font-semibold text-stone-800 leading-snug">{name}</h3>
      </div>
    </motion.article>
  )
}
