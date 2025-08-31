import { useState } from 'react'
import { X, ShoppingBag, Leaf, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useCartStore } from '@/store/cart-store'

interface Product {
  id: number
  name: string
  price: number
  image: string
  sustainability: string
  materials: string
}

interface AddToCartModalProps {
  product: Product | null
  onClose: () => void
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function AddToCartModal({ product, onClose }: AddToCartModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [isAdding, setIsAdding] = useState(false)
  const { addItem, openCart } = useCartStore()
  const { toast } = useToast()

  if (!product) return null

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your preferred size before adding to cart.",
        variant: "destructive"
      })
      return
    }

    setIsAdding(true)
    
    // Simulate adding to cart process
    await new Promise(resolve => setTimeout(resolve, 800))
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      sustainability: product.sustainability,
      materials: product.materials
    })

    toast({
      title: "Added to Cart! 🌱",
      description: `${product.name} in size ${selectedSize} has been added to your sustainable cart.`,
    })

    setIsAdding(false)
    onClose()
  }

  const handleAddAndViewCart = async () => {
    await handleAddToCart()
    openCart()
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="relative">
            <div className="aspect-square bg-sage-50 overflow-hidden rounded-t-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-sage-800 mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-4 h-4 text-sage-600" />
                  <Badge variant="secondary" className="bg-sage-100 text-sage-700">
                    Sustainable
                  </Badge>
                </div>
                <p className="text-sage-600 text-sm">{product.materials}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-sage-800">${product.price}</div>
                <div className="text-xs text-sage-600">Free shipping</div>
              </div>
            </div>

            <div className="border-t border-sage-100 pt-4 mb-6">
              <p className="text-sm text-sage-700 mb-3">{product.sustainability}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-sage-800 mb-3">Select Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className={`
                      ${selectedSize === size 
                        ? 'bg-sage-600 hover:bg-sage-700 text-white' 
                        : 'border-sage-200 hover:bg-sage-50 text-sage-700'
                      }
                    `}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sustainability Info */}
            <div className="bg-sage-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-sage-600" />
                <span className="text-sm font-medium text-sage-800">Sustainable Choice</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-sage-600">
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Organic materials
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Fair trade certified
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Carbon neutral
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Ethical production
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 font-medium"
              >
                {isAdding ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding to Cart...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </div>
                )}
              </Button>
              
              <Button
                onClick={handleAddAndViewCart}
                disabled={isAdding}
                variant="outline"
                className="w-full border-sage-200 text-sage-700 hover:bg-sage-50"
              >
                Add to Cart & View
              </Button>
            </div>

            <p className="text-xs text-sage-600 text-center mt-4">
              30-day returns • Lifetime repair service
            </p>
          </div>
        </div>
      </div>
    </>
  )
}