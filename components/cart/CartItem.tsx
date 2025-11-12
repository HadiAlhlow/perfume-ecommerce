'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import type { CartItem as CartItemType } from '@/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 p-4 glass rounded-lg">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold mb-1">{item.name}</h3>
        {item.size && (
          <p className="text-sm text-text-secondary mb-2">Size: {item.size}</p>
        )}
        <p className="text-accent-primary font-semibold">
          ${item.price.toFixed(2)}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center border border-border-color rounded hover:bg-white/10 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border border-border-color rounded hover:bg-white/10 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
          <button
            onClick={() => removeItem(item.id)}
            className="ml-auto text-error hover:text-error/80 transition-colors"
            aria-label="Remove item"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

