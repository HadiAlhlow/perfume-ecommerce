'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Scroll3DEffect } from '@/components/animations/Scroll3DEffect';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: {
    name: string;
    slug: string;
  };
  rating: number;
  reviewCount: number;
  stock: number;
  variants?: Array<{
    id: string;
    size?: string;
    concentration?: string;
    price: number;
  }>;
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0].id);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container-lg mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const getPrice = (price: any): number => {
    if (typeof price === 'number') return price;
    return parseFloat(price.toString());
  };

  const currentPrice = selectedVariant
    ? product.variants?.find((v) => v.id === selectedVariant)?.price || product.price
    : product.price;

  const priceValue = getPrice(currentPrice);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: priceValue,
      image: Array.isArray(product.images) && product.images.length > 0 
        ? product.images[0] 
        : '/placeholder.jpg',
      quantity,
      variantId: selectedVariant || undefined,
    });
  };

  return (
    <div className="container-lg mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <GSAPScrollReveal direction="right">
          <div>
            <Scroll3DEffect intensity={15} enableTilt={true}>
              <div className="relative h-[600px] w-full rounded-2xl overflow-hidden mb-4">
                <Image
                  src={product.images[selectedImage] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Scroll3DEffect>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-accent-primary'
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </GSAPScrollReveal>

        {/* Product Info */}
        <GSAPScrollReveal direction="left">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-text-secondary mb-6">{product.category.name}</p>

            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-text-secondary">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            <div className="text-4xl font-bold text-accent-primary mb-6">
              ${priceValue.toFixed(2)}
            </div>

            <div className="mb-6">
              <p className="text-text-secondary whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block font-semibold mb-2">Select Variant</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2 rounded-full border-2 transition-colors ${
                        selectedVariant === variant.id
                          ? 'border-accent-primary bg-accent-primary/10'
                          : 'border-border-color hover:border-accent-primary/50'
                      }`}
                    >
                      {variant.size && `${variant.size} `}
                      {variant.concentration && `${variant.concentration} `}
                      ${getPrice(variant.price).toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <label className="font-semibold">Quantity:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-border-color rounded-lg hover:bg-white/10"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-border-color rounded-lg hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-4 bg-accent-primary text-white rounded-full hover:bg-accent-primary/90 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </GSAPScrollReveal>
      </div>
    </div>
  );
}

