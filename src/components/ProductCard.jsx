import { motion, AnimatePresence } from 'framer-motion'
import { Heart, AlertTriangle, XCircle } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useStock } from '../context/StockContext'

function StockBadge({ count }) {
  if (count === null) return null
  if (count === 0) return (
    <span className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full shadow">
      <XCircle size={10} /> Out of Stock
    </span>
  )
  if (count <= 5) return (
    <span className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-bold text-orange-800 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-full shadow-sm">
      <AlertTriangle size={10} /> Only {count} left
    </span>
  )
  return null
}

export default function ProductCard({ name, category, image, index = 0 }) {
  const id = `${category}-${name}`
  const { toggle, isFavorite } = useFavorites()
  const { getStock } = useStock()
  const liked = isFavorite(id)
  const stock = getStock(id)
  const isOut = stock === 0

  function handleLike(e) {
    e.preventDefault()
    e.stopPropagation()
    if (isOut) return
    toggle({ id, name, category, image })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={isOut ? {} : { y: -4 }}
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm transition-shadow duration-300
        ${isOut ? 'opacity-60' : 'hover:shadow-lg'}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        {/* TODO: Replace with real product photo */}
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500
            ${isOut ? 'grayscale' : 'group-hover:scale-105'}`}
          loading="lazy"
        />

        {/* Out-of-stock overlay */}
        {isOut && (
          <div className="absolute inset-0 bg-stone-900/20" />
        )}

        {/* Stock badge */}
        <StockBadge count={stock} />

        {/* Heart button */}
        <button
          onClick={handleLike}
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
          disabled={isOut}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors
            ${isOut
              ? 'bg-white/60 text-stone-300 cursor-not-allowed'
              : liked
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
                fill={liked && !isOut ? 'currentColor' : 'none'}
              />
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <div className="p-4">
        <span className="inline-block text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full mb-2 tracking-wide uppercase">
          {category}
        </span>
        <h3 className={`text-sm font-semibold leading-snug ${isOut ? 'text-stone-400' : 'text-stone-800'}`}>
          {name}
        </h3>
      </div>
    </motion.article>
  )
}
