'use client';

import { useWishlist } from '@/hooks/useWishlist';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

export default function WishlistPage() {
  const { items, removeItem, clear } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  };

  if (items.length === 0) {
    return (
      <div className="container-lg mx-auto px-4 py-20 min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Your Wishlist</h1>
          <p className="text-text-secondary mb-8">Your wishlist is empty</p>
          <Link
            href="/"
            className="button-luxury inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lg mx-auto px-4 py-20 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-display">Your Wishlist</h1>
        <button
          onClick={clear}
          className="text-text-secondary hover:text-[var(--gold)] transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="glass rounded-2xl overflow-hidden hover:shadow-lift transition-all duration-300"
          >
            <Link href={`/products/${item.slug}`}>
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Link>

            <div className="p-6">
              <Link href={`/products/${item.slug}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-[var(--gold)] transition-colors">
                  {item.name}
                </h3>
              </Link>
              <p className="text-xl font-bold text-[var(--charcoal)] mb-4">
                ${item.price.toFixed(2)}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 py-3 bg-[var(--charcoal)] text-white rounded-full hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition-all duration-300 font-semibold hover:scale-105 active:scale-95"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="p-3 bg-white/10 hover:bg-red-500/20 rounded-full transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


