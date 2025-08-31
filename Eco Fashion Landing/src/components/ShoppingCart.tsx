import { useState } from 'react'
import { X, Minus, Plus, ShoppingBag, Trash2, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart-store'
import { useToast } from '@/hooks/use-toast'

export default function ShoppingCart() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getTotalPrice 
  } = useCartStore()
  const { toast } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast({
      title: "Order Placed Successfully! 🌱",
      description: `Thank you for choosing sustainable fashion. Your order of ${items.length} items is being prepared with love and care for the environment.`,
    })
    
    clearCart()
    closeCart()
    setIsCheckingOut(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={closeCart}
      />
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-sage-100 bg-gradient-to-r from-sage-50 to-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sage-600" />
              <h2 className="text-lg font-semibold text-sage-800">Your Sustainable Cart</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeCart}
              className="hover:bg-sage-100 rounded-full p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-sage-400" />
                </div>
                <h3 className="text-lg font-medium text-sage-800 mb-2">Your cart is empty</h3>
                <p className="text-sage-600 mb-6">Add some sustainable fashion pieces to get started</p>
                <Button onClick={closeCart} className="bg-sage-600 hover:bg-sage-700">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="group bg-white border border-sage-100 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-sage-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sage-800 truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs bg-sage-100 text-sage-700">
                            Size: {item.size}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Leaf className="w-3 h-3 text-sage-500" />
                            <span className="text-xs text-sage-600">Sustainable</span>
                          </div>
                        </div>
                        <p className="text-sm text-sage-600 mt-1 truncate">{item.materials}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="w-8 h-8 p-0 border-sage-200 hover:bg-sage-50"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="w-8 h-8 p-0 border-sage-200 hover:bg-sage-50"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sage-800">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id, item.size)}
                              className="w-8 h-8 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-sage-100 p-6 bg-gradient-to-r from-sage-50 to-stone-50">
              <div className="space-y-4">
                {/* Sustainability Impact */}
                <div className="bg-white border border-sage-100 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-4 h-4 text-sage-600" />
                    <span className="text-sm font-medium text-sage-800">Your Environmental Impact</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-sage-600">
                    <div>🌊 Water saved: ~{items.length * 50}L</div>
                    <div>♻️ CO2 reduced: ~{items.length * 2.5}kg</div>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between text-lg font-semibold text-sage-800">
                  <span>Total ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Order...
                    </div>
                  ) : (
                    'Checkout Sustainably'
                  )}
                </Button>

                <p className="text-xs text-sage-600 text-center">
                  Free shipping on orders over $75 • Carbon neutral delivery
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}