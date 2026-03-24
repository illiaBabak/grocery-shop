import { Food } from '@/generated/prisma/client';
import { getImageUrl } from '@/lib/storage/getImageUrl';

export default function Product({ item }: { item: Food }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden liquid-glass cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none" />

      <div className="relative h-40 flex items-center justify-center p-4">
        <img
          src={getImageUrl(item.imageUrl)}
          alt={item.name}
          className="h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="relative px-4 pb-4 space-y-2">
        <span className="inline-block px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider rounded-full bg-white/30 backdrop-blur-sm text-gray-600 border border-white/20">
          {item.category}
        </span>

        <h3 className="text-base font-semibold text-gray-900 leading-tight">{item.name}</h3>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.round(item.rating) ? 'text-amber-400' : 'text-gray-300/60'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {item.rating > 0 ? item.rating.toFixed(1) : '—'}
          </span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-emerald-600">${item.priceBy1kg.toFixed(2)}</span>
          <span className="text-xs text-gray-400">/ kg</span>
        </div>
      </div>
    </div>
  );
}
