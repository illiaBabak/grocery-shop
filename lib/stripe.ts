import Stripe from 'stripe';

const globalForStripe = global as unknown as { stripe: Stripe };

const stripe =
  globalForStripe.stripe ||
  new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2026-03-25.dahlia',
  });

if (process.env.NODE_ENV !== 'production') globalForStripe.stripe = stripe;

export default stripe;
