'use client';

import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="container-lg mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-display mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/orders"
            className="glass p-6 rounded-2xl hover:shadow-lift transition-all duration-300 hover:-translate-y-2"
          >
            <h2 className="text-2xl font-display mb-2">Order History</h2>
            <p className="text-text-secondary">View and track your orders</p>
          </Link>
          
          <Link
            href="/wishlist"
            className="glass p-6 rounded-2xl hover:shadow-lift transition-all duration-300 hover:-translate-y-2"
          >
            <h2 className="text-2xl font-display mb-2">Wishlist</h2>
            <p className="text-text-secondary">Your saved items</p>
          </Link>
        </div>

        <div className="glass p-6 rounded-2xl">
          <h2 className="text-2xl font-display mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 glass rounded-lg border border-border-color"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 glass rounded-lg border border-border-color"
                placeholder="••••••••"
              />
            </div>
            <button className="button-luxury w-full">
              Update Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


