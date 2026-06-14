import { Star } from 'lucide-react'

export default function StarRating({ rating, max = 5, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-stone-200 text-stone-200'
          }
        />
      ))}
    </div>
  )
}
