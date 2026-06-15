import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { ref, onValue, set } from 'firebase/database'
import { db } from '../lib/firebase'

const StockContext = createContext(null)

// Firebase keys cannot contain . # $ / [ ]
// Our IDs use apostrophes, spaces, and hyphens — all safe.
// We replace spaces with underscores so paths look clean in Firebase console.
function toKey(id) {
  return id.replace(/ /g, '_')
}

export function StockProvider({ children }) {
  const [stock, setStock]   = useState({})
  const [prices, setPrices] = useState({})

  useEffect(() => {
    const unsubStock = onValue(ref(db, 'stock'), (snap) => {
      setStock(snap.val() ?? {})
    })
    const unsubPrices = onValue(ref(db, 'prices'), (snap) => {
      setPrices(snap.val() ?? {})
    })
    return () => { unsubStock(); unsubPrices() }
  }, [])

  const setProductStock = useCallback((id, count) => {
    set(ref(db, `stock/${toKey(id)}`), Math.max(0, count))
  }, [])

  const setProductPrice = useCallback((id, price) => {
    set(ref(db, `prices/${toKey(id)}`), price === null ? null : Math.max(0, price))
  }, [])

  const getStock = useCallback((id) => {
    const v = stock[toKey(id)]
    return v === undefined ? null : v
  }, [stock])

  const getPrice = useCallback((id) => {
    const v = prices[toKey(id)]
    return v === undefined ? null : v
  }, [prices])

  return (
    <StockContext.Provider value={{ stock, prices, setProductStock, setProductPrice, getStock, getPrice }}>
      {children}
    </StockContext.Provider>
  )
}

export function useStock() {
  const ctx = useContext(StockContext)
  if (!ctx) throw new Error('useStock must be used inside StockProvider')
  return ctx
}
