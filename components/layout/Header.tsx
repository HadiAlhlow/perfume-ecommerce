'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from './Navigation';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { SearchModal } from '@/components/search/SearchModal';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items: cartItems } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-lg backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container-lg mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link 
              href="/" 
              className={`text-2xl font-bold transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Perfume Shop
            </Link>

            <Navigation isScrolled={isScrolled} />

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Search"
              >
                <svg
                  className={`w-5 h-5 transition-colors ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              
              <Link
                href="/account"
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Account"
              >
                <svg
                  className={`w-5 h-5 transition-colors ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
              
              <Link
                href="/wishlist"
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors relative"
                aria-label="Wishlist"
              >
                <svg
                  className={`w-5 h-5 transition-colors ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  }`}
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
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors relative"
                aria-label="Open cart"
              >
                <svg
                  className={`w-5 h-5 transition-colors ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  }`}
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
                {cartItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[var(--gold)] text-[var(--charcoal)] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

