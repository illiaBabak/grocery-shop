import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/storage/getImageUrl';
import ProductDetails from './components/ProductDetails';
import { getReviewByFoodId } from '@/lib/reviews/getReviewByFoodId';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [food, reviews] = await Promise.all([
    prisma.food.findUnique({ where: { id } }),
    getReviewByFoodId(id),
  ]);

  if (!food) notFound();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30">
      <div className="fixed top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-green-100/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link
            href="/main"
            className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-600 font-medium truncate">{food.name}</span>
        </nav>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden liquid-glass p-6 sm:p-10">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 via-white/10 to-emerald-50/20 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-3xl pointer-events-none" />
              <img
                src={getImageUrl(food.imageUrl)}
                alt={food.name}
                className="relative w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col justify-center">
            <ProductDetails food={food} />
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                {reviews.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review, index) => (
                <div
                  key={`${review.id}-${index}-review`}
                  className="rounded-2xl liquid-glass p-5 sm:p-6 flex flex-col gap-3 relative overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {review.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{review.user.name}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg
                          key={`${review.id}-${index}-star-${i}`}
                          className={`w-4 h-4 ${
                            i < review.stars ? 'text-amber-400' : 'text-gray-200'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="relative text-sm text-gray-600 leading-relaxed">{review.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
