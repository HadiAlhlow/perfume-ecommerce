'use client';

import { useState, useEffect } from 'react';
import { TrackingTimeline } from '@/components/orders/TrackingTimeline';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';
import Image from 'next/image';

interface Order {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  createdAt: string;
  items: Array<{
    id: string;
    product: {
      id: string;
      name: string;
      images: string[];
    };
    quantity: number;
    price: number;
  }>;
  shippingAddress: any;
}

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/orders/${id}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container-lg mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-lg mx-auto px-4 py-12">
        <div className="text-center">Order not found</div>
      </div>
    );
  }

  return (
    <div className="container-lg mx-auto px-4 py-12">
      <GSAPScrollReveal direction="up">
        <h1 className="text-4xl font-bold mb-8">Order Details</h1>
      </GSAPScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TrackingTimeline
            status={order.status}
            trackingNumber={order.trackingNumber}
            carrier={order.carrier}
            estimatedDelivery={order.estimatedDelivery}
          />

          <GSAPScrollReveal direction="up">
            <div className="glass p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.product.images[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-text-secondary">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-accent-primary font-semibold mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GSAPScrollReveal>
        </div>

        <div className="lg:col-span-1">
          <GSAPScrollReveal direction="up">
            <div className="glass p-8 rounded-2xl sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-border-color">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border-color">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p className="text-sm text-text-secondary">
                  {order.shippingAddress?.street}
                  <br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
                  {order.shippingAddress?.zipCode}
                  <br />
                  {order.shippingAddress?.country}
                </p>
              </div>
            </div>
          </GSAPScrollReveal>
        </div>
      </div>
    </div>
  );
}

