import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, LogOut, Plus, Minus, Package, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { useStock } from '../context/StockContext'
import brand from '../data/brand.json'

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN ?? 'nandoos1234'

const ALL_SECTIONS = [
  { label: "Kids' Wear",       products: brand.products.kids,       category: "Kids' Wear"       },
  { label: "Ladies' Wear",     products: brand.products.ladies,     category: "Ladies' Wear"     },
  { label: 'Traditional Wear', products: brand.products.traditional, category: 'Traditional Wear' },
  { label: "Men's Wear",       products: brand.products.mens,       category: "Men's Wear"       },
]

function stockLabel(count) {
  if (count === null) return null
  if (count === 0) return { text: 'Out of Stock', color: 'text-red-600',    bg: 'bg-red-50',    icon: XCircle,        ring: 'ring-red-200'   }
  if (count <= 5)  return { text: 'Low Stock',    color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle,  ring: 'ring-orange-200'}
  return              { text: 'In Stock',      color: 'text-green-700',  bg: 'bg-green-50',  icon: CheckCircle2,   ring: 'ring-green-200' }
}

function StockRow({ product, category }) {
  const id = `${category}-${product.name}`
  const { getStock, setProductStock } = useStock()
  const count = getStock(id)
  const info = stockLabel(count)

  const adjust = useCallback((delta) => {
    setProductStock(id, (count ?? 0) + delta)
  }, [id, count, setProductStock])

  const handleInput = useCallback((e) => {
    const v = parseInt(e.target.value, 10)
    if (!isNaN(v)) setProductStock(id, v)
  }, [id, setProductStock])

  return (
    <div className="flex items-center gap-3 py-3 border-b border-stone-100 last:border-0">
      {/* Thumbnail */}
      <img
        src={product.image}
        alt={product.name}
        className="w-12 h-14 rounded-lg object-cover shrink-0 bg-stone-100"
      />

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-stone-800 truncate">{product.name}</p>
        {info ? (
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold mt-0.5 ${info.color}`}>
            <info.icon size={11} /> {info.text}
          </span>
        ) : (
          <span className="text-[11px] text-stone-400 mt-0.5 inline-block">Stock not set</span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => adjust(-1)}
          disabled={count === 0}
          className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-stone-600 transition-colors"
        >
          <Minus size={13} />
        </button>
        <input
          type="number"
          min={0}
          value={count ?? ''}
          onChange={handleInput}
          placeholder="—"
          className="w-14 text-center text-sm font-semibold text-stone-800 border border-stone-200 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
        />
        <button
          onClick={() => adjust(1)}
          className="w-7 h-7 rounded-lg bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-700 transition-colors"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  )
}

export default function Admin() {
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('admin_unlocked') === '1')
  const [error, setError] = useState(false)
  const { stock } = useStock()

  function handleUnlock(e) {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('admin_unlocked', '1')
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setPin('')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_unlocked')
    setUnlocked(false)
    setPin('')
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-stone-100 p-8 w-full max-w-sm"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-4">
              <Lock size={24} className="text-primary" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-stone-800">Admin Panel</h1>
            <p className="text-stone-500 text-sm mt-1 text-center">Nandoos Garments — Stock Manager</p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide">
                Enter PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(false) }}
                placeholder="••••••••"
                autoFocus
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition
                  ${error ? 'border-red-400 bg-red-50 focus:border-red-400' : 'border-stone-200 focus:border-primary'}`}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1.5 font-medium"
                  >
                    Incorrect PIN. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm"
            >
              Unlock
            </button>
          </form>
        </motion.div>
      </main>
    )
  }

  const totalSet = Object.keys(stock).length
  const outOfStock = Object.values(stock).filter((v) => v === 0).length
  const lowStock = Object.values(stock).filter((v) => v > 0 && v <= 5).length

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Package size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-bold text-stone-800 leading-tight">Stock Manager</h1>
              <p className="text-xs text-stone-500">Nandoos Garments</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-red-500 transition-colors font-medium"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-stone-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-stone-800">{totalSet}</p>
            <p className="text-xs text-stone-500 mt-0.5">Products tracked</p>
          </div>
          <div className="bg-white rounded-xl border border-orange-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-orange-600">{lowStock}</p>
            <p className="text-xs text-stone-500 mt-0.5">Low stock</p>
          </div>
          <div className="bg-white rounded-xl border border-red-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
            <p className="text-xs text-stone-500 mt-0.5">Out of stock</p>
          </div>
        </div>

        {/* Product sections */}
        {ALL_SECTIONS.map((section) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-stone-100 bg-stone-50">
              <h2 className="font-heading font-semibold text-stone-800">{section.label}</h2>
              <p className="text-xs text-stone-500 mt-0.5">{section.products.length} items</p>
            </div>
            <div className="px-5">
              {section.products.map((product) => (
                <StockRow
                  key={product.name}
                  product={product}
                  category={section.category}
                />
              ))}
            </div>
          </motion.div>
        ))}

        <p className="text-center text-xs text-stone-400 pb-4">
          Changes save automatically · Stock data stored locally on this device
        </p>
      </div>
    </main>
  )
}
