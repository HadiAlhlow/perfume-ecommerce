'use client';

import { useEffect, useState } from 'react';
import { OrderCard } from '@/components/orders/OrderCard';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: Array<{ quantity: number }>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data.error) {
          console.error('API Error:', data.error);
          setOrders([]);
        } else {
          console.warn('Unexpected API response:', data);
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container-lg mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container-lg mx-auto px-4 py-12">
      <GSAPScrollReveal direction="up">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>
      </GSAPScrollReveal>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">You haven't placed any orders yet</p>
          <a href="/" className="text-accent-primary hover:underline">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={{
                ...order,
                itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

