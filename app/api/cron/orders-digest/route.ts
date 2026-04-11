import { Prisma } from '@/generated/prisma/client';
import { mailgunClient } from '@/lib/mailgun';
import { getOrdersCreatedSince } from '@/lib/orders/getOrdersCreatedSince';
import { NextRequest, NextResponse } from 'next/server';

type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        food: true;
      };
    };
    user: true;
  };
}>;

export const dynamic = 'force-dynamic';

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

const isAuthorized = (req: NextRequest) => {
  const secret = process.env.CRON_SECRET;

  if (!secret) return false;

  const auth = req.headers.get('authorization');

  if (!auth?.startsWith('Bearer ')) return false;

  return auth.slice('Bearer '.length) === secret;
};

const buildPlainText = (orders: OrderWithItems[]) => {
  return orders
    .map((order) =>
      [
        `Order ${order.id}`,
        `  Created: ${order.createdAt.toISOString()}`,
        `  Total: ${order.totalPrice}`,
        `  Customer: ${order.userId ? `${order.user?.email}` : 'Guest'}`,
        '  Items:',
        ...order.items.map((item) => `    - ${item.food.name} × ${item.quantity}`),
      ].join('\n')
    )
    .join('\n');
};

export const POST = async (request: NextRequest) => {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const since = new Date(Date.now() - TWO_HOURS_MS);

    const orders: OrderWithItems[] = await getOrdersCreatedSince(since);

    const subject =
      orders.length === 0
        ? `Orders digest: none in the last 2h (${new Date().toISOString()})`
        : `Orders digest: ${
            orders.length
          } order(s) (${since.toISOString()} … ${new Date().toISOString()})`;

    const text = orders.length === 0 ? 'No orders in the last 2 hours.' : buildPlainText(orders);

    await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN ?? '', {
      from: 'Mailgun Sandbox <postmaster@' + process.env.MAILGUN_DOMAIN + '>',
      to: ['illiababak776@gmail.com'],
      subject,
      text,
    });

    return NextResponse.json({ ok: true, sent: true, count: orders.length }, { status: 200 });
  } catch (error) {
    console.error('orders-digest failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
