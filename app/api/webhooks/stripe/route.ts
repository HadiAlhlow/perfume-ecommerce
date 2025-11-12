import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { prisma } from '@/lib/db/client';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Create order in database
        // This would need to retrieve cart items from session metadata
        // For now, we'll create a placeholder order

        await prisma.order.create({
          data: {
            email: session.customer_email || '',
            name: session.customer_details?.name || '',
            status: 'PROCESSING',
            total: (session.amount_total || 0) / 100,
            subtotal: (session.amount_subtotal || 0) / 100,
            shipping: 10,
            tax: ((session.amount_total || 0) - (session.amount_subtotal || 0)) / 100,
            shippingAddress: session.shipping_details?.address || {},
            paymentIntentId: session.payment_intent as string,
            paymentMethod: 'stripe',
          },
        });

        break;
      }

      case 'payment_intent.succeeded': {
        // Handle successful payment
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

