import Image from 'next/image';
import { capitalize } from '@/utils/capitalize';
import Link from 'next/link';

const SECTIONS = [
  {
    title: 'vegetables',
    image: '/images/vegetables.png',
    color: 'bg-amber-100',
  },
  {
    title: 'fruits',
    image: '/images/fruits.png',
    color: 'bg-rose-100',
  },
  {
    title: 'berries',
    image: '/images/berries.png',
    color: 'bg-purple-100',
  },
  {
    title: 'juices',
    image: '/images/juices.png',
    color: 'bg-blue-100',
  },
  {
    title: 'greens',
    image: '/images/greens.png',
    color: 'bg-green-100',
  },
  {
    title: 'pantry',
    image: '/images/pantry.png',
    color: 'bg-yellow-100',
  },
  {
    title: 'nuts',
    image: '/images/nuts.png',
    color: 'bg-orange-100',
  },
  {
    title: 'species',
    image: '/images/species.png',
    color: 'bg-slate-200',
  },
];

export default function Sections() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {SECTIONS.map((section) => (
        <Link key={`${section.title}-section`} href={`/main?section=${section.title}`}>
          <div
            className={`${section.color} relative aspect-square rounded-3xl flex flex-col items-center justify-between p-6 cursor-pointer hover:scale-105 transition-transform overflow-hidden`}
          >
            <div className="flex-1 flex items-center justify-center">
              <Image
                src={section.image}
                alt={section.title}
                width={250}
                height={250}
                className="object-contain"
              />
            </div>
            <span className="w-full text-left text-gray-700 font-semibold text-sm">
              {capitalize(section.title)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
