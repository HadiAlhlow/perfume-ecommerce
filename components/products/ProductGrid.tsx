'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: {
    name: string;
    slug: string;
  };
  rating: number;
  reviewCount: number;
}

interface ProductGridProps {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
}

export function ProductGrid({
  categorySlug,
  featured = false,
  limit,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const params = new URLSearchParams();
        if (categorySlug) params.append('category', categorySlug);
        if (featured) params.append('featured', 'true');
        if (limit) params.append('limit', limit.toString());

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.error) {
          console.error('API Error:', data.error);
          setProducts([]);
        } else {
          console.warn('Unexpected API response:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categorySlug, featured, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-96 glass rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <GSAPScrollReveal
          key={product.id}
          direction="up"
          delay={index * 50}
        >
          <ProductCard product={product} />
        </GSAPScrollReveal>
      ))}
    </div>
  );
}

