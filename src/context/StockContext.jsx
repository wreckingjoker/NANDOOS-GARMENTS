import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STOCK_KEY = 'nandoos_stock'
const PRICE_KEY = 'nandoos_prices'

const StockContext = createContext(null)

export function StockProvider({ children }) {
  const [stock, setStock] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STOCK_KEY)) ?? {} } catch { return {} }
  })

  const [prices, setPrices] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PRICE_KEY)) ?? {} } catch { return {} }
  })

  useEffect(() => { localStorage.setItem(STOCK_KEY, JSON.stringify(stock)) }, [stock])
  useEffect(() => { localStorage.setItem(PRICE_KEY, JSON.stringify(prices)) }, [prices])

  const setProductStock = useCallback((id, count) => {
    setStock((prev) => ({ ...prev, [id]: Math.max(0, count) }))
  }, [])

  const setProductPrice = useCallback((id, price) => {
    setPrices((prev) => {
      if (price === '' || price === null) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: Math.max(0, price) }
    })
  }, [])

  const getStock = useCallback((id) => stock[id] ?? null, [stock])
  const getPrice = useCallback((id) => prices[id] ?? null, [prices])

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
