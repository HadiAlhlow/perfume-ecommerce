'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '@/hooks/useCart';
import { CartItem } from './CartItem';
import Link from 'next/link';
import { gsap } from 'gsap';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, getTotal } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: 0, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full max-w-md glass backdrop-blur-xl z-50 shadow-2xl overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <svg
                className="w-6 h-6"
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

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary mb-4">Your cart is empty</p>
              <Link
                href="/"
                onClick={onClose}
                className="inline-block px-6 py-3 bg-accent-primary text-white rounded-full hover:bg-accent-primary/90 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="border-t border-border-color pt-6 mb-6">
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span className="text-[var(--charcoal)]">${getTotal().toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="block w-full text-center px-6 py-4 bg-[var(--charcoal)] text-white rounded-full hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition-all duration-300 font-semibold hover:scale-105 active:scale-95"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={onClose}
                    className="block w-full text-center px-6 py-3 text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

