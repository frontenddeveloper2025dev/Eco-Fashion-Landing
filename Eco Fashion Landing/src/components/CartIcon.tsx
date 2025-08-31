import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'

export default function CartIcon() {
  const { openCart, getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={openCart}
      className="relative hover:bg-sage-50 transition-colors duration-200 rounded-full p-2"
    >
      <ShoppingBag className="w-5 h-5 text-sage-700" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-sage-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Button>
  )
}