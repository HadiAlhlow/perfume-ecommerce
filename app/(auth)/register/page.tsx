'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // TODO: Implement registration
    console.log('Register:', { name, email, password });
  };

  return (
    <div className="container-lg mx-auto px-4 py-12">
      <GSAPScrollReveal direction="up">
        <div className="max-w-md mx-auto glass p-8 rounded-2xl">
          <h1 className="text-4xl font-bold mb-6 text-center">Create Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="John Doe"
              />
            </div>

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

            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-accent-primary text-white rounded-full hover:bg-accent-primary/90 transition-colors font-semibold text-lg"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-text-secondary">
            Already have an account?{' '}
            <Link href="/login" className="text-accent-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </GSAPScrollReveal>
    </div>
  );
}

