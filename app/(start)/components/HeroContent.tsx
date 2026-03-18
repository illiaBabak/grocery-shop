import Link from 'next/link';

export default function HeroContent() {
  return (
    <div className="flex flex-col justify-center items-center md:items-start gap-6 sm:gap-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight text-center md:text-left">
        Groceries
        <br />
        <span className="text-emerald-500">delivered</span>
        <br />
        to your door
      </h1>

      <p className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed text-center md:text-left">
        Fresh vegetables, fruits and everyday essentials — order online and get it delivered in
        minutes.
      </p>

      <div>
        <Link
          href="/main"
          className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg shadow-emerald-200 transition-all hover:shadow-emerald-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Start Shopping
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
  );
}
