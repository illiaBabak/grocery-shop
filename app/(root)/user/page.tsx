import { getUser } from '@/lib/auth/getUser';
import { getOrdersByUser } from '@/lib/orders/getOrdersByUser';
import { redirect } from 'next/navigation';
import { EditableName } from './EditableName';

const STATUS_STYLES: Record<string, string> = {
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  canceled: 'bg-red-50 text-red-600 border-red-200',
};

export default async function UserPage() {
  const user = await getUser();

  if (!user) redirect('/login');

  const orders = await getOrdersByUser(user.userId);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50/60">
      {/* Cover */}
      <div className="h-24 sm:h-28 bg-emerald-50 border-b border-emerald-100" />

      {/* Profile header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="-mt-16 sm:-mt-20">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 border-4 border-white shadow-xl flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-bold text-white select-none">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <EditableName name={user.name} />
          <p className="mt-1 text-[15px] text-gray-500">{user.email}</p>
        </div>

        <div className="mt-6 h-px bg-gray-200" />

        {/* Orders */}
        <section className="mt-8 pb-12">
          <h2 className="text-lg font-semibold text-gray-900">Order history</h2>

          {!orders.length ? (
            <p className="mt-4 text-sm text-gray-400">No orders yet.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {orders.map((order, index) => (
                <li
                  key={`${order.id}-${index}-user-order`}
                  className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                >
                  {/* Order header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-gray-50/70 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border capitalize ${
                          STATUS_STYLES[order.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Items */}
                  <ul className="divide-y divide-gray-100">
                    {order.items.map((item, index) => (
                      <li
                        key={`${item.id}-${index}-user-order-item`}
                        className="flex items-center justify-between px-5 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {item.food.name}
                          </p>
                          <p className="text-xs text-gray-400">{item.quantity} kg</p>
                        </div>
                        <p className="text-sm font-medium text-gray-700 shrink-0 ml-4">
                          ${(item.food.priceBy1kg * item.quantity).toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
