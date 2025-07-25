"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FilterState } from "@/lib/types"

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export default function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    destinations: true,
    duration: true,
    price: true,
    tourTypes: true,
    accommodation: false,
    groupSize: false,
    difficulty: false,
    rating: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      destinations: [],
      duration: [1, 30],
      priceRange: [0, 10000],
      tourTypes: [],
      accommodationTypes: [],
      groupSizes: [],
      difficulty: [],
      rating: 0,
    })
  }

  const destinations = ["Uganda", "Tanzania", "Kenya", "Rwanda", "Botswana", "South Africa"]
  const tourTypes = ["Wildlife", "Gorilla trekking", "Cultural", "Adventure"]
  const accommodationTypes = ["Budget", "Mid-range", "Luxury"]
  const groupSizes = ["Private", "Small group", "Large group"]
  const difficultyLevels = ["Easy", "Moderate", "Challenging"]

  const FilterSection = ({
    title,
    section,
    children,
  }: {
    title: string
    section: keyof typeof expandedSections
    children: React.ReactNode
  }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection(section)}>
        <CardTitle className="flex items-center justify-between text-base">
          {title}
          {expandedSections[section] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>
      {expandedSections[section] && <CardContent className="pt-0">{children}</CardContent>}
    </Card>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      <FilterSection title="Destinations" section="destinations">
        <div className="space-y-3">
          {destinations.map((destination) => (
            <div key={destination} className="flex items-center space-x-2">
              <Checkbox
                id={destination}
                checked={filters.destinations.includes(destination)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("destinations", [...filters.destinations, destination])
                  } else {
                    updateFilter(
                      "destinations",
                      filters.destinations.filter((d) => d !== destination),
                    )
                  }
                }}
              />
              <Label htmlFor={destination} className="text-sm">
                {destination}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Duration" section="duration">
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={filters.duration}
              onValueChange={(value) => updateFilter("duration", value)}
              max={30}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {filters.duration[0]} day{filters.duration[0] !== 1 ? "s" : ""}
            </span>
            <span>
              {filters.duration[1]} day{filters.duration[1] !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Price Range" section="price">
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Tour Types" section="tourTypes">
        <div className="space-y-3">
          {tourTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.tourTypes.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("tourTypes", [...filters.tourTypes, type])
                  } else {
                    updateFilter(
                      "tourTypes",
                      filters.tourTypes.filter((t) => t !== type),
                    )
                  }
                }}
              />
              <Label htmlFor={type} className="text-sm">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Accommodation" section="accommodation">
        <div className="space-y-3">
          {accommodationTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.accommodationTypes.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("accommodationTypes", [...filters.accommodationTypes, type])
                  } else {
                    updateFilter(
                      "accommodationTypes",
                      filters.accommodationTypes.filter((t) => t !== type),
                    )
                  }
                }}
              />
              <Label htmlFor={type} className="text-sm">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Group Size" section="groupSize">
        <div className="space-y-3">
          {groupSizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={filters.groupSizes.includes(size)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("groupSizes", [...filters.groupSizes, size])
                  } else {
                    updateFilter(
                      "groupSizes",
                      filters.groupSizes.filter((s) => s !== size),
                    )
                  }
                }}
              />
              <Label htmlFor={size} className="text-sm">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Difficulty" section="difficulty">
        <div className="space-y-3">
          {difficultyLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={level}
                checked={filters.difficulty.includes(level)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("difficulty", [...filters.difficulty, level])
                  } else {
                    updateFilter(
                      "difficulty",
                      filters.difficulty.filter((d) => d !== level),
                    )
                  }
                }}
              />
              <Label htmlFor={level} className="text-sm">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rating" section="rating">
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={(checked) => {
                  updateFilter("rating", checked ? rating : 0)
                }}
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm">
                {rating}+ stars
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}
