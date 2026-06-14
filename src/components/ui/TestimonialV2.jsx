import React from 'react'
import { motion } from 'framer-motion'
import brand from '../../data/brand.json'

const brandTestimonials = brand.testimonials.map((t) => ({
  text: t.text,
  name: t.author,
  role: t.role,
  initial: t.author[0],
  rating: t.rating,
}))

// Two columns: forward and reversed for visual rhythm
const firstColumn = brandTestimonials
const secondColumn = [...brandTestimonials].reverse()

function TestimonialsColumn({ className, testimonials, duration = 10 }) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-5 pb-5 list-none m-0 p-0"
      >
        {[...Array(2)].map((_, setIndex) => (
          <React.Fragment key={setIndex}>
            {testimonials.map(({ text, name, role, initial, rating }, i) => (
              <motion.li
                key={`${setIndex}-${i}`}
                aria-hidden={setIndex === 1 ? 'true' : 'false'}
                tabIndex={setIndex === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)',
                  transition: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                className="p-8 rounded-3xl border border-stone-200 shadow-md shadow-black/5 w-72 bg-white transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <blockquote className="m-0 p-0">
                  {/* Star rating */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <svg
                        key={si}
                        className={`w-4 h-4 ${si < rating ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-stone-600 leading-relaxed text-sm m-0">
                    &ldquo;{text}&rdquo;
                  </p>

                  <footer className="flex items-center gap-3 mt-6 pt-5 border-t border-stone-100">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-primary font-bold text-sm shrink-0 ring-2 ring-amber-100 group-hover:ring-primary/30 transition-all duration-300">
                      {initial}
                    </div>
                    <div className="flex flex-col">
                      <cite className="font-semibold not-italic tracking-tight text-sm leading-5 text-stone-900">
                        {name}
                      </cite>
                      <span className="text-xs leading-5 tracking-tight text-stone-500 mt-0.5">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  )
}

export default function TestimonialV2() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto"
      >
        {/* Heading */}
        <div className="flex flex-col items-center max-w-xl mx-auto mb-14 text-center">
          <span className="border border-stone-300 py-1 px-4 rounded-full text-xs font-semibold tracking-widest uppercase text-stone-500 bg-white">
            Reviews
          </span>
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl sm:text-4xl font-bold mt-5 text-stone-800"
          >
            What Customers Say
          </h2>
          <p className="mt-4 text-stone-500 leading-relaxed max-w-sm">
            Real reviews from happy shoppers in Thodupuzha
          </p>
        </div>

        {/* Scrolling columns */}
        <div
          className="flex justify-center gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[480px] overflow-hidden"
          role="region"
          aria-label="Scrolling customer reviews"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={13} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden sm:block"
            duration={18}
          />
        </div>
      </motion.div>
    </section>
  )
}
