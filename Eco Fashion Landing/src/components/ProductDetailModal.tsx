import { useState } from 'react'
import { X, Leaf, Award, Globe, Users, Factory, Droplets, CheckCircle, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface MaterialSource {
  material: string
  origin: string
  certification: string
  impact: string
  supplier: string
  story: string
}

interface ProductDetails {
  id: number
  name: string
  category: string
  price: number
  image: string
  sustainability: string
  materials: string
  story: string
  detailedDescription: string
  materialSources: MaterialSource[]
  carbonFootprint: string
  waterUsage: string
  socialImpact: string
  certifications: string[]
  careInstructions: string[]
  sizingNote: string
}

interface ProductDetailModalProps {
  product: ProductDetails | null
  onClose: () => void
}

const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'impact' | 'care'>('overview')

  if (!product) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-3 py-1">
              {product.category}
            </Badge>
            <h2 className="text-2xl font-light">{product.name}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Product Image */}
          <div className="lg:w-1/2 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover fabric-texture"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 text-primary-foreground">
                <Leaf className="w-3 h-3 mr-1" />
                Sustainable
              </Badge>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-2xl font-light text-primary">${product.price}</div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-border/50 bg-muted/30">
              {[
                { key: 'overview', label: 'Overview', icon: Globe },
                { key: 'materials', label: 'Materials', icon: Leaf },
                { key: 'impact', label: 'Impact', icon: Award },
                { key: 'care', label: 'Care', icon: CheckCircle }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                    activeTab === tab.key
                      ? 'text-primary border-b-2 border-primary bg-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">About This Piece</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {product.detailedDescription}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.story}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Droplets className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="font-medium">Water Saved</div>
                        <div className="text-sm text-muted-foreground">{product.waterUsage}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Leaf className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="font-medium">Carbon Impact</div>
                        <div className="text-sm text-muted-foreground">{product.carbonFootprint}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium">Social Impact</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {product.socialImpact}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Material Sources & Journey</h3>
                    <p className="text-muted-foreground mb-6">
                      Transparency is key to sustainable fashion. Here's the complete journey of every material in this garment.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {product.materialSources.map((source, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="bg-primary/5 px-4 py-3 border-b border-border/50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-primary">
                                    {index + 1}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-medium">{source.material}</h4>
                                  <p className="text-sm text-muted-foreground">{source.origin}</p>
                                </div>
                              </div>
                              <Badge variant="outline">
                                {source.certification}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="p-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Factory className="w-4 h-4 text-muted-foreground" />
                                  <span className="font-medium">Supplier</span>
                                </div>
                                <p className="text-muted-foreground">{source.supplier}</p>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Globe className="w-4 h-4 text-muted-foreground" />
                                  <span className="font-medium">Environmental Impact</span>
                                </div>
                                <p className="text-muted-foreground">{source.impact}</p>
                              </div>
                            </div>
                            
                            <div className="pt-2 border-t border-border/50">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {source.story}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-secondary/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="font-medium">Traceability Promise</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Every material is traced from source to garment. QR codes on each piece link to detailed supply chain documentation.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'impact' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Environmental & Social Impact</h3>
                    <p className="text-muted-foreground mb-6">
                      This garment's positive impact extends far beyond your wardrobe.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Water Conservation</div>
                            <div className="text-sm text-muted-foreground">{product.waterUsage}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Compared to conventional production methods
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">Carbon Footprint</div>
                            <div className="text-sm text-muted-foreground">{product.carbonFootprint}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Through renewable energy and efficient logistics
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Community Impact</div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {product.socialImpact}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-accent/10 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Lifecycle Promise</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Designed for 10+ years of wear</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Free repair service for life</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Take-back program for recycling</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Biodegradable or recyclable materials only</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Caring for Your Garment</h3>
                    <p className="text-muted-foreground mb-6">
                      Proper care extends the life of your garment and maintains its sustainable qualities.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Care Instructions</h4>
                    <div className="space-y-2">
                      {product.careInstructions.map((instruction, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Card className="bg-primary/5">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Sizing & Fit</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.sizingNote}
                      </p>
                    </CardContent>
                  </Card>

                  <div className="bg-secondary/10 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Sustainable Care Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Wash only when necessary to preserve fibers</li>
                      <li>• Use cold water to reduce energy consumption</li>
                      <li>• Air dry to maintain fabric integrity</li>
                      <li>• Store properly to prevent premature wear</li>
                      <li>• Use eco-friendly detergents when possible</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="border-t border-border/50 p-6">
              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  Add to Cart
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Save to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal