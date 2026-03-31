import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import stripe from '@/lib/stripe';

export const POST = async (req: NextRequest) => {
  const body = await req.text();

  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return new NextResponse('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        const orderId = session.metadata?.orderId;

        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id;

        if (!orderId) {
          console.error('Missing orderId in session metadata');
          return NextResponse.json({ received: true });
        }

        const order = await prisma.order.findUnique({
          where: { id: orderId },
        });

        if (!order) {
          console.error('Order not found:', orderId);
          return NextResponse.json({ received: true });
        }

        if (order.status === 'paid') {
          return NextResponse.json({ received: true });
        }

        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: 'paid',
            stripePaymentIntentId: paymentIntentId ?? null,
          },
        });

        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler failed:', error);
    return new NextResponse('Webhook handler error', { status: 500 });
  }
};
