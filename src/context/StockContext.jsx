import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'nandoos_stock'

const StockContext = createContext(null)

export function StockProvider({ children }) {
  const [stock, setStock] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stock))
  }, [stock])

  const setProductStock = useCallback((id, count) => {
    setStock((prev) => ({ ...prev, [id]: Math.max(0, count) }))
  }, [])

  // null = not set by owner (no badge shown), number = set count
  const getStock = useCallback((id) => stock[id] ?? null, [stock])

  return (
    <StockContext.Provider value={{ stock, setProductStock, getStock }}>
      {children}
    </StockContext.Provider>
  )
}

export function useStock() {
  const ctx = useContext(StockContext)
  if (!ctx) throw new Error('useStock must be used inside StockProvider')
  return ctx
}
