"use client";

import React from "react";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FilterState } from "@/lib/types";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

// Custom neutral slider for filters
const FilterSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-muted-foreground" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-muted-foreground bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
FilterSlider.displayName = SliderPrimitive.Root.displayName;

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    destinations: true,
    duration: true,
    price: true,
    tourTypes: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

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
    });
  };

  const destinations = [
    "Uganda",
    "Tanzania",
    "Kenya",
    "Rwanda",
    "Botswana",
    "South Africa",
  ];
  const tourTypes = ["Wildlife", "Gorilla trekking", "Cultural", "Adventure"];

  const FilterSection = ({
    title,
    section,
    children,
  }: {
    title: string;
    section: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <Card className="mb-4">
      <CardHeader
        className="pb-3 cursor-pointer"
        onClick={() => toggleSection(section)}
      >
        <CardTitle className="flex items-center justify-between text-base">
          {title}
          {expandedSections[section] ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CardTitle>
      </CardHeader>
      {expandedSections[section] && (
        <CardContent className="pt-0">{children}</CardContent>
      )}
    </Card>
  );

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
                    updateFilter("destinations", [
                      ...filters.destinations,
                      destination,
                    ]);
                  } else {
                    updateFilter(
                      "destinations",
                      filters.destinations.filter((d) => d !== destination)
                    );
                  }
                }}
                className="checkbox-neutral"
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
            <FilterSlider
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
            <FilterSlider
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
                    updateFilter("tourTypes", [...filters.tourTypes, type]);
                  } else {
                    updateFilter(
                      "tourTypes",
                      filters.tourTypes.filter((t) => t !== type)
                    );
                  }
                }}
                className="checkbox-neutral"
              />
              <Label htmlFor={type} className="text-sm">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
