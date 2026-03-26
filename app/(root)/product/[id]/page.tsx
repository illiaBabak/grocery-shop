import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/storage/getImageUrl';
import ProductDetails from './components/ProductDetails';
import ReviewForm from './components/ReviewForm';
import ReviewCard from './components/ReviewCard';
import { getReviewByFoodId } from '@/lib/reviews/getReviewByFoodId';
import { getUser } from '@/lib/auth/getUser';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [food, reviews, user] = await Promise.all([
    prisma.food.findUnique({ where: { id } }),
    getReviewByFoodId(id),
    getUser(),
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

        {/* Write a review */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Leave a review</h2>
          </div>
          <ReviewForm userId={user?.userId ?? ''} foodId={id} />
        </section>

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
                <ReviewCard
                  key={`${review.id}-${index}-review`}
                  review={review}
                  foodId={id}
                  isOwner={user?.userId === review.userId}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
