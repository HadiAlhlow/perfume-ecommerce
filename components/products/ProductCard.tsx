'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Scroll3DEffect } from '@/components/animations/Scroll3DEffect';

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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const price = typeof product.price === 'number' 
    ? product.price 
    : parseFloat(product.price.toString());
  
  const productImage = Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0] 
    : '/placeholder.jpg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price,
      image: productImage,
      quantity: 1,
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price,
      image: productImage,
      quantity: 1,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      productId: product.id,
      name: product.name,
      price,
      image: productImage,
      slug: product.slug,
    });
  };

  return (
    <div
      className="group glass rounded-2xl overflow-hidden hover:shadow-lift transition-all duration-300 hover:-translate-y-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Scroll3DEffect intensity={10} enableTilt={true}>
        <div className="relative h-80 w-full overflow-hidden">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={Array.isArray(product.images) && product.images[activeImage] 
                ? product.images[activeImage] 
                : productImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </Link>
          
          {/* Image Gallery Indicators */}
          {Array.isArray(product.images) && product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImage(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImage === idx ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 z-10 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleWishlistToggle}
              className="glass p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg
                className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              onClick={handleQuickAdd}
              className="glass p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
              aria-label="Quick add to cart"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </Scroll3DEffect>

      <div className="p-6">
        <Link href={`/products/${product.slug}`}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--gold)] transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-text-secondary">{product.category.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-[var(--charcoal)]">
                ${price.toFixed(2)}
              </p>
            </div>
          </div>
        </Link>

        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="text-sm text-text-secondary ml-1">
              ({product.reviewCount})
            </span>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-[var(--charcoal)] text-white rounded-full hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition-all duration-300 font-semibold hover:scale-105 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

