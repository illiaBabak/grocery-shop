import HeroBasket from './components/HeroBasket';
import Link from 'next/link';
import { CATEGORIES } from '@/utils/constants';
import { capitalize } from '@/utils/capitalize';
import Image from 'next/image';

export default function StartPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50/60 via-white to-emerald-50/40">
      <div className="h-[calc(100vh-64px)] mx-auto max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-[2fr_3fr] items-center">
        <div className="mb-18 sm:mb-22 flex justify-center md:justify-start">
          <div className="flex flex-col justify-center items-center md:items-start gap-6 sm:gap-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight text-center md:text-left">
              Groceries
              <br />
              <span className="text-emerald-500">delivered</span>
              <br />
              to your door
            </h1>

            <p className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed text-center md:text-left">
              Fresh vegetables, fruits and everyday essentials — order online and get it delivered
              in minutes.
            </p>

            <div>
              <Link
                href="/main"
                className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg shadow-emerald-200 transition-all hover:shadow-emerald-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span data-testid="start-shopping">Start Shopping</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full hidden md:block">
          <HeroBasket />
        </div>
      </div>
      <div className="mx-auto max-w-7xl w-full px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {CATEGORIES.map((category) => (
          <Link key={`${category.title}-category`} href={`/main?category=${category.title}`}>
            <div
              className={`${category.color} relative aspect-square rounded-3xl flex flex-col items-stretch p-6 cursor-pointer hover:scale-105 transition-transform overflow-hidden`}
            >
              <div className="relative flex-1">
                <Image src={category.image} alt={category.title} fill className="object-contain" />
              </div>
              <span className="w-full text-left text-gray-700 font-semibold text-sm mt-2 shrink-0">
                {capitalize(category.title)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
