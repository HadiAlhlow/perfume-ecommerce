'use client';

import Link from 'next/link';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  itemCount: number;
}

interface OrderCardProps {
  order: Order;
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-500/20 text-yellow-600',
  PROCESSING: 'bg-blue-500/20 text-blue-600',
  SHIPPED: 'bg-purple-500/20 text-purple-600',
  DELIVERED: 'bg-green-500/20 text-green-600',
  CANCELLED: 'bg-red-500/20 text-red-600',
  REFUNDED: 'bg-gray-500/20 text-gray-600',
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <GSAPScrollReveal direction="up">
      <Link
        href={`/orders/${order.id}`}
        className="block glass p-6 rounded-2xl hover:shadow-lift transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h3>
            <p className="text-sm text-text-secondary">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[order.status] || statusColors.PENDING
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-text-secondary">
            {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
          </p>
          <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
        </div>
      </Link>
    </GSAPScrollReveal>
  );
}

