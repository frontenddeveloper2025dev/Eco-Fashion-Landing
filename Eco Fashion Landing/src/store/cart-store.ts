import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  size: string
  quantity: number
  sustainability: string
  materials: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number, size: string) => void
  updateQuantity: (id: number, size: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(
          item => item.id === product.id && item.size === product.size
        )
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id && item.size === product.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        }
        
        return {
          items: [...state.items, { ...product, quantity: 1 }]
        }
      }),
      
      removeItem: (id, size) => set((state) => ({
        items: state.items.filter(item => !(item.id === id && item.size === size))
      })),
      
      updateQuantity: (id, size, quantity) => set((state) => {
        if (quantity <= 0) {
          return {
            items: state.items.filter(item => !(item.id === id && item.size === size))
          }
        }
        
        return {
          items: state.items.map(item =>
            item.id === id && item.size === size
              ? { ...item, quantity }
              : item
          )
        }
      }),
      
      clearCart: () => set({ items: [] }),
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'sustainable-fashion-cart',
      partialize: (state) => ({ items: state.items })
    }
  )
)