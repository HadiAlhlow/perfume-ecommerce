'use client';

import { useState } from 'react';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container-lg mx-auto px-4 py-12">
      <GSAPScrollReveal direction="up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-xl text-text-secondary mb-12 text-center max-w-2xl mx-auto">
          Have a question or need help? We're here to assist you.
        </p>
      </GSAPScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <GSAPScrollReveal direction="right">
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-text-secondary">support@perfumeshop.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-text-secondary">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-text-secondary">
                  123 Fragrance Street<br />
                  Perfume City, PC 12345<br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </GSAPScrollReveal>

        <GSAPScrollReveal direction="left">
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-accent-primary text-white rounded-full hover:bg-accent-primary/90 transition-colors font-semibold text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </GSAPScrollReveal>
      </div>
    </div>
  );
}

