'use client';

import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

export default function ShippingPage() {
  return (
    <div className="container-lg mx-auto px-4 py-12">
      <GSAPScrollReveal direction="up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Shipping Information</h1>
        <p className="text-xl text-text-secondary mb-12 text-center max-w-2xl mx-auto">
          Everything you need to know about our shipping policies and delivery options.
        </p>
      </GSAPScrollReveal>

      <div className="max-w-4xl mx-auto space-y-8">
        <GSAPScrollReveal direction="up" delay={100}>
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Shipping Options</h2>
            <div className="space-y-4 text-text-secondary">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Standard Shipping</h3>
                <p>5-7 business days - $10.00</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Express Shipping</h3>
                <p>2-3 business days - $20.00</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Overnight Shipping</h3>
                <p>Next business day - $35.00</p>
              </div>
            </div>
          </div>
        </GSAPScrollReveal>

        <GSAPScrollReveal direction="up" delay={200}>
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Shipping Destinations</h2>
            <p className="text-text-secondary mb-4">
              We currently ship to the following countries:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li>United States</li>
              <li>Canada</li>
              <li>United Kingdom</li>
              <li>Australia</li>
              <li>Most European Union countries</li>
            </ul>
          </div>
        </GSAPScrollReveal>

        <GSAPScrollReveal direction="up" delay={300}>
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
            <p className="text-text-secondary mb-4">
              Once your order ships, you'll receive a tracking number via email. You can track your order status in real-time through our order tracking page.
            </p>
            <p className="text-text-secondary">
              Simply visit the <a href="/orders" className="text-accent-primary hover:underline">Orders</a> page and enter your order number to see the latest updates.
            </p>
          </div>
        </GSAPScrollReveal>

        <GSAPScrollReveal direction="up" delay={400}>
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Returns & Exchanges</h2>
            <p className="text-text-secondary mb-4">
              We offer a 30-day return policy on all unopened products. If you're not satisfied with your purchase, you can return it for a full refund or exchange.
            </p>
            <p className="text-text-secondary">
              To initiate a return, please contact our customer service team at support@perfumeshop.com or use our <a href="/contact" className="text-accent-primary hover:underline">contact form</a>.
            </p>
          </div>
        </GSAPScrollReveal>
      </div>
    </div>
  );
}

