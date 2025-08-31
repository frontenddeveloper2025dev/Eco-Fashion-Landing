import { useState, useMemo } from 'react'

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
  materialSources: Array<{
    material: string
    origin: string
    certification: string
    impact: string
    supplier: string
    story: string
  }>
  carbonFootprint: string
  waterUsage: string
  socialImpact: string
  certifications: string[]
  careInstructions: string[]
  sizingNote: string
}

interface FilterState {
  search: string
  categories: string[]
  priceRange: [number, number]
  materials: string[]
  certifications: string[]
  sortBy: 'name' | 'price-low' | 'price-high' | 'sustainability'
}

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    priceRange: [0, 500],
    materials: [],
    certifications: [],
    sortBy: 'name'
  })

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(products.map(p => p.category))].sort()
    
    const materials = [...new Set(
      products.flatMap(p => 
        p.materialSources.map(source => source.material)
      )
    )].sort()
    
    const certifications = [...new Set(
      products.flatMap(p => p.certifications)
    )].sort()
    
    return { categories, materials, certifications }
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const searchMatch = 
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.sustainability.toLowerCase().includes(searchLower) ||
          product.materials.toLowerCase().includes(searchLower) ||
          product.story.toLowerCase().includes(searchLower) ||
          product.detailedDescription.toLowerCase().includes(searchLower) ||
          product.materialSources.some(source => 
            source.material.toLowerCase().includes(searchLower) ||
            source.origin.toLowerCase().includes(searchLower) ||
            source.story.toLowerCase().includes(searchLower)
          )
        
        if (!searchMatch) return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Materials filter
      if (filters.materials.length > 0) {
        const productMaterials = product.materialSources.map(source => source.material)
        const hasMatchingMaterial = filters.materials.some(material => 
          productMaterials.includes(material)
        )
        if (!hasMatchingMaterial) return false
      }

      // Certifications filter
      if (filters.certifications.length > 0) {
        const hasMatchingCertification = filters.certifications.some(cert => 
          product.certifications.includes(cert)
        )
        if (!hasMatchingCertification) return false
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'sustainability':
          // Sort by number of certifications as sustainability metric
          return b.certifications.length - a.certifications.length
        default:
          return 0
      }
    })

    return filtered
  }, [products, filters])

  return {
    filters,
    setFilters,
    filteredProducts,
    filterOptions,
    totalProducts: products.length,
    filteredCount: filteredProducts.length
  }
}