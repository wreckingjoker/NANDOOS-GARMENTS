import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'nandoos_favorites'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggle = useCallback((product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product]
    })
  }, [])

  const isFavorite = useCallback(
    (id) => favorites.some((p) => p.id === id),
    [favorites]
  )

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider')
  return ctx
}
