import Image from 'next/image';

const VALUES = [
  {
    icon: '🌿',
    title: 'Fresh & Natural',
    description:
      'We source directly from local farms to bring you the freshest produce every single day.',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Order by noon and get your groceries delivered to your door the same day.',
  },
  {
    icon: '💰',
    title: 'Fair Prices',
    description: 'No middlemen. We work directly with growers so you pay less for more quality.',
  },
  {
    icon: '♻️',
    title: 'Eco Friendly',
    description: 'Recyclable packaging and zero-waste practices across our entire supply chain.',
  },
];

const STATS = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '50+', label: 'Local Farms' },
  { value: '24h', label: 'Delivery' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/60 via-white to-emerald-50/40">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
          About Us
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Fresh groceries, delivered
          <br />
          <span className="text-emerald-500">with care</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
          We believe everyone deserves access to fresh, high-quality food. GroceryShop connects you
          directly with local farmers and producers to bring the best ingredients straight to your
          kitchen.
        </p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-green-100 p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-emerald-500">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image + Story */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-emerald-100">
            <Image
              src="/images/vegetables.png"
              alt="Fresh vegetables"
              fill
              className="object-contain p-8"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              GroceryShop started with a simple idea: what if you could get farm-fresh produce
              without leaving your home? In 2024, we partnered with local farmers to create a
              marketplace that puts quality and freshness first.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Today, we serve thousands of families, delivering handpicked fruits, vegetables, and
              pantry essentials right to their doors. Every item is carefully selected to meet our
              strict freshness standards — because you deserve the best.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <span className="text-3xl mb-4 block">{value.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
