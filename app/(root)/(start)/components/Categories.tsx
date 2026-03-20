import Image from 'next/image';
import { capitalize } from '@/utils/capitalize';
import Link from 'next/link';
import { CATEGORIES } from '@/utils/constants';

export default function Categories() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
  );
}
