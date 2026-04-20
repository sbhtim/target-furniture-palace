'use client'
import { createContext, useContext, useState } from 'react'
import { Product } from '@/lib/supabase'

type CartItem = { product: Product; quantity: number }
type CartContextType = {
  items: CartItem[]
  addToCart: (p: Product) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (p: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === p.id)
      if (existing) return prev.map(i => i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { product: p, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => setItems(prev => prev.filter(i => i.product.id !== id))

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) { removeFromCart(id); return }
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i))
  }

  const clearCart = () => setItems([])
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}
