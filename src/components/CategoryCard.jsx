import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CategoryCard({ name, description, image, to, index = 0, objectPosition = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={to}
        className="group relative flex h-64 sm:h-72 rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={`Browse ${name}`}
      >
        {/* TODO: Replace with real category image */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          style={{ objectPosition }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-heading text-2xl font-bold text-white mb-1 drop-shadow-sm">
            {name}
          </h3>
          {description && (
            <p className="text-stone-200 text-sm mb-3 leading-relaxed">{description}</p>
          )}
          <span className="inline-flex items-center gap-1.5 text-amber-300 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
            View Collection <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
