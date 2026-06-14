import { motion } from 'framer-motion'

export default function ProductCard({ name, category, image, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="aspect-[4/5] overflow-hidden bg-stone-100">
        {/* TODO: Replace with real product photo */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
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
