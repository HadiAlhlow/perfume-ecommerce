'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication
    console.log('Login:', { email, password });
  };

  return (
    <div className="container-lg mx-auto px-4 py-12">
      <GSAPScrollReveal direction="up">
        <div className="max-w-md mx-auto glass p-8 rounded-2xl">
          <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-accent-primary text-white rounded-full hover:bg-accent-primary/90 transition-colors font-semibold text-lg"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-text-secondary">
            Don't have an account?{' '}
            <Link href="/register" className="text-accent-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </GSAPScrollReveal>
    </div>
  );
}

