import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { PRODUCTS } from '../data/products'

export type CartItem = { id: string; qty: number }

type CartCtx = {
  items: CartItem[]
  count: number
  total: number
  open: boolean
  toast: string | null
  add: (id: string, title?: string) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  setOpen: (v: boolean) => void
}

const Ctx = createContext<CartCtx | null>(null)

const priceOf = (id: string) => PRODUCTS.find((p) => p.id === id)?.price ?? 0

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number>(0)

  const add = useCallback((id: string, title?: string) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.id === id)
      return ex ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { id, qty: 1 }]
    })
    if (title) {
      window.clearTimeout(toastTimer.current)
      setToast(`${title} — в корзине`)
      toastTimer.current = window.setTimeout(() => setToast(null), 2200)
    }
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))))
  }, [])

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0)
    const total = items.reduce((s, i) => s + i.qty * priceOf(i.id), 0)
    return { items, count, total, open, toast, add, remove, setQty, setOpen }
  }, [items, open, toast, add, remove, setQty])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const v = useContext(Ctx)
  if (!v) throw new Error('CartProvider missing')
  return v
}

export const fmt = (n: number) => n.toLocaleString('ru-RU')
