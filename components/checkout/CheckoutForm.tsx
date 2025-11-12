'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  shippingAddress: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'ZIP code is required'),
    country: z.string().min(2, 'Country is required'),
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  return (
    <GSAPScrollReveal direction="up">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass p-8 rounded-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

        <div>
          <label className="block font-semibold mb-2">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2">Full Name</label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
          {errors.name && (
            <p className="text-error text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2">Phone (Optional)</label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Street Address</label>
          <input
            {...register('shippingAddress.street')}
            type="text"
            className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
          {errors.shippingAddress?.street && (
            <p className="text-error text-sm mt-1">
              {errors.shippingAddress.street.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">City</label>
            <input
              {...register('shippingAddress.city')}
              type="text"
              className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
            {errors.shippingAddress?.city && (
              <p className="text-error text-sm mt-1">
                {errors.shippingAddress.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">State</label>
            <input
              {...register('shippingAddress.state')}
              type="text"
              className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
            {errors.shippingAddress?.state && (
              <p className="text-error text-sm mt-1">
                {errors.shippingAddress.state.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">ZIP Code</label>
            <input
              {...register('shippingAddress.zipCode')}
              type="text"
              className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
            {errors.shippingAddress?.zipCode && (
              <p className="text-error text-sm mt-1">
                {errors.shippingAddress.zipCode.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">Country</label>
            <input
              {...register('shippingAddress.country')}
              type="text"
              className="w-full px-4 py-3 border border-border-color rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
            {errors.shippingAddress?.country && (
              <p className="text-error text-sm mt-1">
                {errors.shippingAddress.country.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-accent-primary text-white rounded-full hover:bg-accent-primary/90 transition-colors font-semibold text-lg"
        >
          Continue to Payment
        </button>
      </form>
    </GSAPScrollReveal>
  );
}

