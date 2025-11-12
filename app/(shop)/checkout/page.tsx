'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';
import { loadStripe } from '@stripe/stripe-js';
import { getStripe } from '@/lib/stripe/client';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);

  const handleFormSubmit = async (data: any) => {
    setFormData(data);
    setStep(2);
  };

  const handlePayment = async (paymentMethod: string) => {
    try {
      if (paymentMethod === 'stripe') {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items,
            email: formData.email,
            shippingAddress: formData.shippingAddress,
            paymentMethod: 'stripe',
          }),
        });

        const { sessionId, url } = await response.json();

        if (sessionId) {
          const stripe = await getStripe();
          if (stripe) {
            await stripe.redirectToCheckout({ sessionId });
          }
        }
      } else if (paymentMethod === 'paypal') {
        // Handle PayPal payment
        // This would integrate with PayPal SDK
        alert('PayPal integration coming soon');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-lg mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <a href="/" className="text-accent-primary hover:underline">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="container-lg mx-auto px-4 py-12">
      <GSAPScrollReveal direction="up">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      </GSAPScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 ? (
            <CheckoutForm onSubmit={handleFormSubmit} />
          ) : (
            <PaymentForm
              onPayment={handlePayment}
              onBack={() => setStep(1)}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-text-secondary">
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border-color pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(getTotal() * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-border-color">
                <span>Total</span>
                <span>${(getTotal() + 10 + getTotal() * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

