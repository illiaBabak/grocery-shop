import { getUser } from '@/lib/auth/getUser';
import { createOrder } from '@/lib/orders/createOrder';
import { updateOrder } from '@/lib/orders/updateOrder';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/storage/getImageUrl';
import stripe from '@/lib/stripe';
import { isOrderItemArray } from '@/utils/guards';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { items, guest } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    if (!isOrderItemArray(items)) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    const currentUser = await getUser();

    if (!currentUser && !guest) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const foods = await Promise.all(
      items.map(async (item) => {
        const food = await prisma.food.findUnique({
          where: { id: item.id },
        });

        if (!food) {
          throw new Error(`Food not found: ${item.id}`);
        }

        return { item, food };
      })
    );

    const lineItems = foods.map(({ item, food }) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(food.priceBy1kg * 100),
        product_data: { name: food.name, images: [getImageUrl(food.imageUrl)] },
      },
    }));

    const totalPrice = foods.reduce(
      (acc, { item, food }) => acc + item.quantity * food.priceBy1kg,
      0
    );

    const order = await createOrder({
      ...(currentUser ? { user: { connect: { id: currentUser.userId } } } : {}),
      items: { create: items.map((item) => ({ foodId: item.id, quantity: item.quantity })) },
      totalPrice,
      status: 'pending',
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/main?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/main?checkout=canceled`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['PL'],
      },
      metadata: {
        orderId: order.id,
      },
    });

    await updateOrder(order.id, {
      stripeCheckoutSessionId: session.id,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
