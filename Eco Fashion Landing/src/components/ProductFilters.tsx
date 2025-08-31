import { useState } from 'react'
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

interface FilterState {
  search: string
  categories: string[]
  priceRange: [number, number]
  materials: string[]
  certifications: string[]
  sortBy: 'name' | 'price-low' | 'price-high' | 'sustainability'
}

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableCategories: string[]
  availableMaterials: string[]
  availableCertifications: string[]
  totalProducts: number
  filteredCount: number
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  availableCategories,
  availableMaterials, 
  availableCertifications,
  totalProducts,
  filteredCount
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates }
    onFiltersChange(newFilters)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category)
    updateFilters({ categories: newCategories })
  }

  const handleMaterialChange = (material: string, checked: boolean) => {
    const newMaterials = checked
      ? [...filters.materials, material]
      : filters.materials.filter(m => m !== material)
    updateFilters({ materials: newMaterials })
  }

  const handleCertificationChange = (certification: string, checked: boolean) => {
    const newCertifications = checked
      ? [...filters.certifications, certification]
      : filters.certifications.filter(c => c !== certification)
    updateFilters({ certifications: newCertifications })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      categories: [],
      priceRange: [0, 500],
      materials: [],
      certifications: [],
      sortBy: 'name'
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.categories.length > 0) count++
    if (filters.materials.length > 0) count++
    if (filters.certifications.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count++
    return count
  }

  return (
    <div className="space-y-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-600 w-4 h-4" />
          <Input
            placeholder="Search sustainable fashion..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10 border-sage-200 focus:border-sage-400 bg-white/80 backdrop-blur-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="border-sage-200 text-sage-700 hover:bg-sage-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-2 bg-sage-600 text-white">
                {getActiveFilterCount()}
              </Badge>
            )}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </Button>
          
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="text-sage-600 hover:text-sage-800 hover:bg-sage-50"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center text-sm text-sage-600">
        <span>
          Showing {filteredCount} of {totalProducts} sustainable products
        </span>
        
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilters({ sortBy: e.target.value as FilterState['sortBy'] })}
          className="border border-sage-200 rounded-md px-3 py-1 bg-white/80 backdrop-blur-sm text-sage-700 focus:border-sage-400 focus:outline-none"
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="sustainability">Most Sustainable</option>
        </select>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <Card className="border-sage-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-sage-800 mb-3">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableCategories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category, checked as boolean)
                      }
                      className="data-[state=checked]:bg-sage-600 data-[state=checked]:border-sage-600"
                    />
                    <span className="text-sm text-sage-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-sage-800 mb-3">Price Range</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0] || ''}
                    onChange={(e) => 
                      updateFilters({ 
                        priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] 
                      })
                    }
                    className="border-sage-200 focus:border-sage-400 text-sm"
                  />
                </div>
                <span className="text-sage-500">-</span>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1] || ''}
                    onChange={(e) => 
                      updateFilters({ 
                        priceRange: [filters.priceRange[0], parseInt(e.target.value) || 500] 
                      })
                    }
                    className="border-sage-200 focus:border-sage-400 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Materials */}
            <div>
              <h3 className="font-medium text-sage-800 mb-3">Sustainable Materials</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableMaterials.map((material) => (
                  <label key={material} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={filters.materials.includes(material)}
                      onCheckedChange={(checked) => 
                        handleMaterialChange(material, checked as boolean)
                      }
                      className="data-[state=checked]:bg-sage-600 data-[state=checked]:border-sage-600"
                    />
                    <span className="text-sm text-sage-700">{material}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-medium text-sage-800 mb-3">Certifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableCertifications.map((certification) => (
                  <label key={certification} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={filters.certifications.includes(certification)}
                      onCheckedChange={(checked) => 
                        handleCertificationChange(certification, checked as boolean)
                      }
                      className="data-[state=checked]:bg-sage-600 data-[state=checked]:border-sage-600"
                    />
                    <span className="text-sm text-sage-700">{certification}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filter Tags */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="bg-sage-100 text-sage-800 hover:bg-sage-200">
              Search: "{filters.search}"
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => updateFilters({ search: '' })}
              />
            </Badge>
          )}
          
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="bg-sage-100 text-sage-800 hover:bg-sage-200">
              {category}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleCategoryChange(category, false)}
              />
            </Badge>
          ))}
          
          {filters.materials.map((material) => (
            <Badge key={material} variant="secondary" className="bg-sage-100 text-sage-800 hover:bg-sage-200">
              {material}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleMaterialChange(material, false)}
              />
            </Badge>
          ))}
          
          {filters.certifications.map((certification) => (
            <Badge key={certification} variant="secondary" className="bg-sage-100 text-sage-800 hover:bg-sage-200">
              {certification}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleCertificationChange(certification, false)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}