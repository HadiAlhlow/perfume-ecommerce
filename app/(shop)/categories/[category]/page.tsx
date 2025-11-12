'use client';

import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';
import { ScrollTextReveal } from '@/components/animations/ScrollTextReveal';

const categoryNames: Record<string, string> = {
  floral: 'Floral',
  woody: 'Woody',
  fresh: 'Fresh',
  oriental: 'Oriental',
  citrus: 'Citrus',
};

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const categoryName = categoryNames[category] || category;

  return (
    <div className="container-lg mx-auto px-4 py-12">
      <GSAPScrollReveal direction="up">
        <ScrollTextReveal splitBy="word" direction="up" className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{categoryName}</h1>
        </ScrollTextReveal>
        <p className="text-xl text-text-secondary mb-12">
          Explore our collection of {categoryName.toLowerCase()} fragrances
        </p>
      </GSAPScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters onFilterChange={() => {}} />
        </div>
        <div className="lg:col-span-3">
          <ProductGrid categorySlug={category} />
        </div>
      </div>
    </div>
  );
}

