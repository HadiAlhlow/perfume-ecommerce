'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const categories = [
  { name: 'Floral', slug: 'floral', description: 'Delicate and romantic' },
  { name: 'Woody', slug: 'woody', description: 'Warm and earthy' },
  { name: 'Fresh', slug: 'fresh', description: 'Crisp and invigorating' },
  { name: 'Oriental', slug: 'oriental', description: 'Exotic and sensual' },
  { name: 'Citrus', slug: 'citrus', description: 'Bright and energizing' },
];

interface NavigationProps {
  isScrolled?: boolean;
}

export function Navigation({ isScrolled = false }: NavigationProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const textColorClass = isScrolled 
    ? 'text-foreground' 
    : 'text-white';
  const textColorHoverClass = isScrolled 
    ? 'text-foreground/80' 
    : 'text-white/80';
  const activeBgClass = isScrolled 
    ? 'bg-white/10' 
    : 'bg-white/10';
  const hoverBgClass = isScrolled 
    ? 'hover:bg-white/5' 
    : 'hover:bg-white/10';

  return (
    <>
      <nav className="hidden md:flex items-center gap-3">
        <Link
          href="/"
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            pathname === '/'
              ? `${activeBgClass} ${textColorClass} font-semibold`
              : `${textColorHoverClass} ${hoverBgClass}`
          }`}
        >
          Home
        </Link>
        {categories.map((category) => (
          <div
            key={category.slug}
            className="relative"
            onMouseEnter={() => setActiveDropdown(category.slug)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href={`/categories/${category.slug}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === `/categories/${category.slug}`
                  ? `${activeBgClass} ${textColorClass} font-semibold`
                  : `${textColorHoverClass} ${hoverBgClass}`
              }`}
            >
              {category.name}
            </Link>
            {activeDropdown === category.slug && (
              <div className="absolute top-full left-0 mt-2 glass p-6 rounded-lg min-w-[200px] shadow-lift backdrop-blur-md border border-white/20">
                <p className="text-xs text-text-secondary mb-3">{category.description}</p>
                <Link
                  href={`/categories/${category.slug}`}
                  className="block py-2 hover:text-[var(--gold)] transition-colors"
                >
                  Shop All {category.name}
                </Link>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Menu */}
      <button
        className={`md:hidden p-2 transition-colors ${
          isScrolled ? 'text-foreground' : 'text-white'
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 md:hidden pt-20">
          <div className="container-lg mx-auto px-4 py-8">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-white"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-2xl font-display text-white hover:text-[var(--gold)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="text-2xl font-display text-white hover:text-[var(--gold)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

