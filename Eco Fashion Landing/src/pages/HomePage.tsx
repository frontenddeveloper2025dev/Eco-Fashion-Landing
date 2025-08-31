import { useState, useEffect } from 'react'
import { 
  Leaf, 
  Droplets, 
  Recycle, 
  Heart, 
  Award, 
  ChevronRight,
  Star,
  Truck,
  Shield,
  Users,
  Eye,
  ShoppingBag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProductDetailModal from '@/components/ProductDetailModal'
import ShoppingCart from '@/components/ShoppingCart'
import CartIcon from '@/components/CartIcon'
import AddToCartModal from '@/components/AddToCartModal'
import ProductFilters from '@/components/ProductFilters'
import { useProductFilters } from '@/hooks/useProductFilters'

interface MaterialSource {
  material: string
  origin: string
  certification: string
  impact: string
  supplier: string
  story: string
}

interface Product {
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

interface Achievement {
  icon: React.ReactNode
  value: string
  label: string
  description: string
}

function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [addToCartProduct, setAddToCartProduct] = useState<Product | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const products: Product[] = [
    {
      id: 1,
      name: "Organic Cotton Essentials",
      category: "Basics",
      price: 89,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop",
      sustainability: "100% GOTS certified organic cotton",
      materials: "Grown without pesticides, fair trade sourced",
      story: "Handwoven by artisan cooperatives in Peru, supporting 200+ families with fair wages and sustainable practices.",
      detailedDescription: "Our signature organic cotton essentials represent the perfect harmony between comfort, style, and environmental responsibility. Each piece is crafted from the finest GOTS-certified organic cotton, ensuring no harmful chemicals touch your skin or the environment. The timeless designs are made to last, reducing the need for frequent replacements.",
      materialSources: [
        {
          material: "Organic Cotton",
          origin: "Piura Valley, Peru",
          certification: "GOTS Certified",
          impact: "80% less water, zero pesticides",
          supplier: "Bergman Rivera Organic Farms",
          story: "Grown in the mineral-rich soils of Peru's Piura Valley, this cotton is naturally colored and requires no bleaching. The cooperative has been organic for three generations, preserving traditional farming methods."
        },
        {
          material: "Natural Dyes",
          origin: "Plant-based extracts, Peru",
          certification: "OEKO-TEX 100",
          impact: "Biodegradable, non-toxic",
          supplier: "Andes Color Collective",
          story: "Extracted from native plants like cochineal, indigo, and turmeric, these dyes create rich colors while supporting indigenous botanical knowledge and forest conservation."
        }
      ],
      carbonFootprint: "Carbon negative production",
      waterUsage: "2,200L saved per garment",
      socialImpact: "Supports 200+ families in Peru with fair wages 40% above local minimum wage, provides education scholarships for farmers' children, and funds community healthcare programs.",
      certifications: ["GOTS", "Fair Trade", "OEKO-TEX", "Cradle to Cradle"],
      careInstructions: [
        "Machine wash cold (30°C or below)",
        "Use mild, eco-friendly detergent",
        "Air dry to preserve organic fibers",
        "Iron on low heat if needed",
        "Store in breathable cotton bags"
      ],
      sizingNote: "Cut for a relaxed fit. Organic cotton may shrink 2-3% after first wash. Consider sizing up for looser fit."
    },
    {
      id: 2,
      name: "Linen Summer Collection",
      category: "Seasonal",
      price: 124,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
      sustainability: "European flax, zero-waste production",
      materials: "Belgian linen, natural dyes only",
      story: "Crafted from flax grown in Northern France, processed using traditional methods that require 80% less water.",
      detailedDescription: "Experience the luxury of European linen in our summer collection. Made from the finest Belgian flax, these pieces embody effortless elegance while maintaining our commitment to environmental stewardship. The breathable, naturally antibacterial properties of linen make it perfect for warm weather while getting softer with each wear.",
      materialSources: [
        {
          material: "Belgian Linen",
          origin: "Flanders, Belgium",
          certification: "European Flax",
          impact: "100% biodegradable, requires no irrigation",
          supplier: "Famille Depla Textiles",
          story: "Grown in the mineral-rich coastal soil of Flanders, this flax thrives on natural rainfall. The Depla family has perfected sustainable flax cultivation over four generations, using traditional retting pools."
        },
        {
          material: "Eco Buttons",
          origin: "Corozo nuts, Ecuador",
          certification: "FSC Certified",
          impact: "Renewable, biodegradable",
          supplier: "Tagua Initiative",
          story: "Harvested from the tagua palm in Ecuador's cloud forests, these 'vegetable ivory' buttons support rainforest conservation and provide income for indigenous communities."
        }
      ],
      carbonFootprint: "50% lower than cotton",
      waterUsage: "6x less water than cotton",
      socialImpact: "Preserves traditional European textile craftsmanship, supports 50+ artisan families, and maintains heritage flax farming practices that protect biodiversity.",
      certifications: ["European Flax", "OEKO-TEX", "Masters of Linen"],
      careInstructions: [
        "Machine wash cold or hand wash preferred",
        "Use gentle cycle with like colors",
        "Air dry - avoid direct sunlight",
        "Iron while slightly damp for best results",
        "Embrace the natural wrinkled texture"
      ],
      sizingNote: "Linen has a relaxed drape. Fits true to size with room for natural movement. Pre-washed to minimize shrinkage."
    },
    {
      id: 3,
      name: "Recycled Wool Outerwear",
      category: "Outerwear",
      price: 198,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop",
      sustainability: "Made from 90% recycled wool fibers",
      materials: "Post-consumer wool, biodegradable buttons",
      story: "Each coat diverts 12 plastic bottles from landfills while creating luxurious warmth that lasts decades.",
      detailedDescription: "Our recycled wool outerwear proves that sustainability and luxury go hand in hand. By transforming post-consumer wool garments into new pieces, we create coats with the same warmth and durability as virgin wool while dramatically reducing environmental impact. Each piece has a unique character from its recycled origins.",
      materialSources: [
        {
          material: "Recycled Wool",
          origin: "Post-consumer garments, UK",
          certification: "GRS Certified",
          impact: "Diverts 2.5kg textile waste per coat",
          supplier: "Yorkshire Wool Recycling Co.",
          story: "Collected from textile banks across the UK, old wool garments are mechanically broken down and respun into new yarn. This process uses 95% less water and energy than virgin wool production."
        },
        {
          material: "Recycled Polyester Lining",
          origin: "Ocean plastic bottles, Mediterranean",
          certification: "Ocean Positive",
          impact: "12 bottles diverted per garment",
          supplier: "Sea Shepherd Textiles",
          story: "Plastic bottles collected from Mediterranean beaches are processed into high-performance insulation that's warmer than down while being completely animal-free."
        }
      ],
      carbonFootprint: "90% lower than new wool",
      waterUsage: "95% water savings",
      socialImpact: "Creates jobs in textile recycling industry, supports coastal cleanup programs, and provides training for circular economy skills in former textile manufacturing communities.",
      certifications: ["GRS", "RCS", "OEKO-TEX", "Ocean Positive"],
      careInstructions: [
        "Dry clean only with eco-friendly solvents",
        "Spot clean minor stains when possible",
        "Air out regularly to maintain freshness",
        "Store on padded hangers",
        "Professional repair service available"
      ],
      sizingNote: "Structured fit designed for layering. Runs slightly large. Check size guide for chest measurements."
    },
    {
      id: 4,
      name: "Hemp Denim Line",
      category: "Denim",
      price: 156,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop",
      sustainability: "Hemp-cotton blend, laser-finished",
      materials: "55% hemp, 45% organic cotton",
      story: "Revolutionary laser finishing eliminates chemical washes, while hemp provides unmatched durability and comfort.",
      detailedDescription: "Revolutionizing denim through our hemp-cotton blend that gets better with age. Our innovative laser finishing process creates authentic vintage looks without harmful chemicals, while hemp's natural strength ensures these jeans will last for decades. The more you wear them, the more comfortable they become.",
      materialSources: [
        {
          material: "Industrial Hemp",
          origin: "Manitoba, Canada",
          certification: "Organic Certified",
          impact: "Regenerates soil, sequesters carbon",
          supplier: "Prairie Hemp Co-operative",
          story: "Grown on regenerative farms in Manitoba, this hemp actually improves soil health while growing. It requires no pesticides and sequesters 4 tons of CO2 per hectare while producing incredibly strong fiber."
        },
        {
          material: "Organic Cotton",
          origin: "California, USA",
          certification: "GOTS Certified",
          impact: "Dryland farming, no irrigation",
          supplier: "Central Valley Organic Farmers",
          story: "Grown using dryland farming techniques in California's Central Valley, this cotton relies entirely on seasonal rainfall. The farmers practice crop rotation with hemp to maintain soil health."
        }
      ],
      carbonFootprint: "Carbon negative lifecycle",
      waterUsage: "90% less than conventional denim",
      socialImpact: "Supports regenerative agriculture transition for 25+ farms, provides technical training for sustainable farming practices, and creates rural employment in hemp processing facilities.",
      certifications: ["GOTS", "Regenerative Organic", "OEKO-TEX", "Cradle to Cradle"],
      careInstructions: [
        "Wash inside out in cold water",
        "Minimize washing - spot clean when possible",
        "Air dry to maintain fiber strength",
        "No fabric softener needed",
        "Patch and repair service available"
      ],
      sizingNote: "Hemp denim stretches to fit. Consider sizing down as they will loosen with wear. Leg length remains consistent."
    },
    {
      id: 5,
      name: "Tencel Silk Scarves",
      category: "Accessories",
      price: 78,
      image: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=600&h=800&fit=crop",
      sustainability: "Tencel from sustainable eucalyptus",
      materials: "Peace silk, eucalyptus Tencel",
      story: "Silkworms complete their lifecycle naturally while eucalyptus grows without irrigation on marginal land.",
      detailedDescription: "Luxury meets compassion in our Tencel silk scarves. Combining the lustrous beauty of peace silk with the sustainable innovation of eucalyptus Tencel, these accessories offer unparalleled softness and drape. Each scarf tells a story of innovation in sustainable textiles while maintaining the timeless elegance of silk.",
      materialSources: [
        {
          material: "Peace Silk",
          origin: "Assam, India",
          certification: "Ahimsa Certified",
          impact: "Cruelty-free, supports biodiversity",
          supplier: "Ahimsa Silk Collective",
          story: "Unlike conventional silk, peace silk allows silkworms to complete their natural lifecycle and emerge as moths. This creates slightly textured silk with incredible strength and luster while maintaining ethical production."
        },
        {
          material: "Tencel Lyocell",
          origin: "Sustainably managed forests, Austria",
          certification: "FSC Certified",
          impact: "99% solvent recovery, closed-loop production",
          supplier: "Lenzing AG",
          story: "Made from eucalyptus trees grown on marginal land unsuitable for food crops. The closed-loop production process recovers and reuses 99% of solvents, creating zero waste."
        }
      ],
      carbonFootprint: "60% lower than conventional silk",
      waterUsage: "95% water recovery and reuse",
      socialImpact: "Supports ethical silk farming cooperatives in India, provides alternative income for eucalyptus farmers, and invests in women's education programs in silk-producing regions.",
      certifications: ["Ahimsa", "FSC", "OEKO-TEX", "EU Ecolabel"],
      careInstructions: [
        "Hand wash in cool water with silk detergent",
        "Do not wring or twist",
        "Roll in towel to remove excess water",
        "Air dry flat away from direct sunlight",
        "Light steam to remove wrinkles"
      ],
      sizingNote: "Generous sizing suitable for multiple styling options. Dimensions: 180cm x 90cm for optimal draping."
    },
    {
      id: 6,
      name: "Bamboo Loungewear",
      category: "Comfort",
      price: 92,
      image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=800&fit=crop",
      sustainability: "Bamboo viscose, carbon negative",
      materials: "Organic bamboo, natural antibacterial",
      story: "Bamboo grows 3 feet per day, absorbing 35% more CO2 than trees while creating incredibly soft, breathable fabric.",
      detailedDescription: "Experience ultimate comfort with our bamboo loungewear collection. Bamboo's natural properties create fabric that's softer than cotton, more breathable than linen, and naturally antimicrobial. Perfect for relaxation and sleep, these pieces maintain their softness wash after wash while supporting rapid forest regeneration.",
      materialSources: [
        {
          material: "Bamboo Viscose",
          origin: "Managed bamboo forests, China",
          certification: "FSC Certified",
          impact: "Regenerates without replanting, sequesters CO2",
          supplier: "Bamboo Textile Innovation Co.",
          story: "Harvested from managed bamboo groves that regenerate from their root system without replanting. This bamboo grows without pesticides or fertilizers while improving soil quality and preventing erosion."
        },
        {
          material: "Organic Modal Blend",
          origin: "Beech trees, Scandinavia",
          certification: "PEFC Certified",
          impact: "Renewable forestry, biodegradable",
          supplier: "Nordic Forest Textiles",
          story: "Made from beech trees in sustainably managed Scandinavian forests. The modal adds structure and durability while maintaining the soft, silky feel of bamboo."
        }
      ],
      carbonFootprint: "Carbon negative - absorbs more CO2 than it produces",
      waterUsage: "70% less water than cotton",
      socialImpact: "Provides sustainable livelihoods for rural bamboo farmers, supports reforestation programs, and funds clean water projects in bamboo-growing communities.",
      certifications: ["FSC", "OEKO-TEX", "PEFC", "Bamboo Textile Certification"],
      careInstructions: [
        "Machine wash gentle cycle, cold water",
        "Use mild detergent, no bleach",
        "Tumble dry low or air dry",
        "Remove promptly to prevent wrinkles",
        "Natural antimicrobial properties reduce wash frequency"
      ],
      sizingNote: "Relaxed fit for maximum comfort. Bamboo has natural stretch. Consider true to size for fitted look, size up for roomier feel."
    }
  ]

  // Initialize product filtering
  const {
    filters,
    setFilters,
    filteredProducts,
    filterOptions,
    totalProducts,
    filteredCount
  } = useProductFilters(products)

  const achievements: Achievement[] = [
    {
      icon: <Droplets className="w-8 h-8 text-primary" />,
      value: "50M",
      label: "Liters Saved",
      description: "Water conserved through efficient dyeing processes"
    },
    {
      icon: <Recycle className="w-8 h-8 text-primary" />,
      value: "12K",
      label: "Bottles Recycled",
      description: "Plastic bottles diverted from oceans annually"
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      value: "Carbon",
      label: "Negative",
      description: "Every garment removes more CO2 than it creates"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      value: "500+",
      label: "Artisans",
      description: "Fair trade partners across 6 countries"
    }
  ]

  return (
    <div className="min-h-screen natural-gradient">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-sage-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-sage-600" />
              <span className="text-xl font-semibold text-sage-800">Verdant</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#collections" className="text-sage-700 hover:text-sage-900 transition-colors">Collections</a>
              <a href="#sustainability" className="text-sage-700 hover:text-sage-900 transition-colors">Impact</a>
              <a href="#story" className="text-sage-700 hover:text-sage-900 transition-colors">Our Story</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <CartIcon />
              <Button variant="ghost" size="sm" className="hover:bg-sage-50">
                <Heart className="w-5 h-5 text-sage-700" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden texture-overlay pt-20">
        {/* Decorative organic shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 organic-blob"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent/10 organic-blob-alt"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-secondary/20 organic-blob"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className={`space-y-8 ${isVisible ? 'slide-in-up' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Leaf className="w-4 h-4" />
              Certified B-Corp & Climate Neutral
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-tight">
              <span className="block text-primary">Verdant</span>
              <span className="block text-muted-foreground">Fashion</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
              Where timeless elegance meets environmental consciousness. 
              Every thread tells a story of sustainability, craftsmanship, and care for our planet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-6 text-lg">
                Explore Collections
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Our Impact Story
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Product Collections Showcase */}
      <section id="collections" className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-light mb-6 ${isVisible ? 'slide-in-up stagger-1' : ''}`}>
              Conscious Collections
            </h2>
            <p className={`text-xl text-muted-foreground max-w-3xl mx-auto ${isVisible ? 'slide-in-up stagger-2' : ''}`}>
              Each piece is thoughtfully designed with respect for people, planet, and timeless style. 
              Discover the stories behind sustainable luxury.
            </p>
          </div>

          {/* Product Filters */}
          <div className={`mb-12 ${isVisible ? 'slide-in-up stagger-3' : ''}`}>
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={filterOptions.categories}
              availableMaterials={filterOptions.materials}
              availableCertifications={filterOptions.certifications}
              totalProducts={totalProducts}
              filteredCount={filteredCount}
            />
          </div>

          {/* Staggered Grid Layout */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className={`group hover:shadow-xl transition-all duration-500 overflow-hidden ${
                  isVisible ? `slide-in-up stagger-${index + 1}` : ''
                }`}
              >
                <div 
                  className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 fabric-texture"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-background/90 backdrop-blur-sm hover:bg-background"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                    {product.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-2xl font-light text-primary">${product.price}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{product.sustainability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{product.materials}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {product.story}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-sage-600 hover:bg-sage-700"
                      onClick={() => setAddToCartProduct(product)}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-sage-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-sage-600" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-sage-800">No Products Found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any sustainable fashion pieces matching your criteria. 
                  Try adjusting your filters or exploring our full collection.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    search: '',
                    categories: [],
                    priceRange: [0, 500],
                    materials: [],
                    certifications: [],
                    sortBy: 'name'
                  })}
                  className="border-sage-200 text-sage-700 hover:bg-sage-50"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sustainability Impact Section */}
      <section id="sustainability" className="py-24 texture-overlay">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-light mb-6 ${isVisible ? 'slide-in-up stagger-1' : ''}`}>
              Measuring Our Impact
            </h2>
            <p className={`text-xl text-muted-foreground max-w-3xl mx-auto ${isVisible ? 'slide-in-up stagger-2' : ''}`}>
              Transparency is at the heart of everything we do. Here's how we're making a difference 
              for our planet and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card 
                key={index} 
                className={`text-center p-8 hover:shadow-lg transition-all duration-300 ${
                  isVisible ? `slide-in-up stagger-${index + 3}` : ''
                }`}
              >
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    {achievement.icon}
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-light text-primary">{achievement.value}</div>
                    <div className="font-medium">{achievement.label}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Impact Story */}
          <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${isVisible ? 'slide-in-left stagger-4' : ''}`}>
              <h3 className="text-3xl font-light">The Full Circle Promise</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every Verdant garment is designed for longevity, but when its time comes, 
                we take it back. Our closed-loop system ensures nothing goes to waste—
                fibers are recycled, materials are composted, and new life begins.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We've eliminated single-use packaging, partnered with renewable energy suppliers, 
                and offset 120% of our carbon footprint. Because true luxury means leaving 
                the world better than we found it.
              </p>
              <Button variant="outline" className="gap-2">
                <Heart className="w-4 h-4" />
                Read Our Full Impact Report
              </Button>
            </div>
            
            <div className={`relative ${isVisible ? 'slide-in-right stagger-5' : ''}`}>
              <div className="aspect-square bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 organic-blob flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="text-6xl font-extralight text-primary">♻</div>
                  <div className="text-2xl font-light">Zero Waste</div>
                  <div className="text-muted-foreground">By Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className={`text-center space-y-4 ${isVisible ? 'slide-in-up stagger-1' : ''}`}>
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Climate Neutral Shipping</h3>
              <p className="text-muted-foreground">
                Carbon-negative delivery through our partnership with renewable logistics providers.
              </p>
            </div>

            <div className={`text-center space-y-4 ${isVisible ? 'slide-in-up stagger-2' : ''}`}>
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Lifetime Guarantee</h3>
              <p className="text-muted-foreground">
                We stand behind our quality. If it doesn't last, we'll repair or replace it.
              </p>
            </div>

            <div className={`text-center space-y-4 ${isVisible ? 'slide-in-up stagger-3' : ''}`}>
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Ethical Standards</h3>
              <p className="text-muted-foreground">
                Fair wages, safe working conditions, and community investment in every partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="story" className="py-24 natural-gradient">
        <div className="container mx-auto px-6 text-center">
          <div className={`space-y-8 max-w-3xl mx-auto ${isVisible ? 'slide-in-up stagger-1' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-light">
              Join the Movement
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Fashion that feels good, looks beautiful, and does good. 
              Discover conscious luxury that aligns with your values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-6 text-lg">
                Shop Sustainable Collections
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Subscribe for Impact Updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-primary/5 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="text-2xl font-light">Verdant</span>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Conscious fashion for a sustainable future. Every choice makes a difference.
            </p>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <span>B-Corp Certified</span>
              <span>Climate Neutral</span>
              <span>Fair Trade</span>
              <span>GOTS Approved</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Shopping Cart */}
      <ShoppingCart />

      {/* Add to Cart Modal */}
      <AddToCartModal 
        product={addToCartProduct}
        onClose={() => setAddToCartProduct(null)}
      />
    </div>
  )
}

export default HomePage