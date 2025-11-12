'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border-color mt-20">
      <div className="container-lg mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Perfume Shop</h3>
            <p className="text-text-secondary">
              Discover luxury fragrances that define your unique style.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/floral" className="text-text-secondary hover:text-foreground">
                  Floral
                </Link>
              </li>
              <li>
                <Link href="/categories/woody" className="text-text-secondary hover:text-foreground">
                  Woody
                </Link>
              </li>
              <li>
                <Link href="/categories/fresh" className="text-text-secondary hover:text-foreground">
                  Fresh
                </Link>
              </li>
              <li>
                <Link href="/categories/oriental" className="text-text-secondary hover:text-foreground">
                  Oriental
                </Link>
              </li>
              <li>
                <Link href="/categories/citrus" className="text-text-secondary hover:text-foreground">
                  Citrus
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/orders" className="text-text-secondary hover:text-foreground">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-text-secondary hover:text-foreground">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-foreground">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-foreground">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-foreground">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border-color text-center text-text-secondary">
          <p>&copy; {new Date().getFullYear()} Perfume Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

