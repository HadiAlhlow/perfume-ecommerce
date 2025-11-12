'use client';

import { useState } from 'react';

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  priceRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    sortBy: 'newest',
  });

  const handlePriceChange = (min: number, max: number) => {
    const newFilters = { ...filters, priceRange: [min, max] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="glass p-6 rounded-2xl mb-8">
      <h3 className="font-semibold mb-4">Filters</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="0"
              max="1000"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handlePriceChange(Number(e.target.value), filters.priceRange[1])
              }
              className="w-24 px-3 py-2 border border-border-color rounded-lg bg-transparent"
            />
            <span>-</span>
            <input
              type="number"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceChange(filters.priceRange[0], Number(e.target.value))
              }
              className="w-24 px-3 py-2 border border-border-color rounded-lg bg-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
            className="w-full px-3 py-2 border border-border-color rounded-lg bg-transparent"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}

