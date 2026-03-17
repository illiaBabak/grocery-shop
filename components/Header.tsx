'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = () => router.push(`/main?search=${encodeURIComponent(search.trim())}`);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-green-100">
      <div className="mx-auto max-w-7xl sm:px-6 px-3 sm:py-3 py-2">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="text-base sm:text-xl font-bold text-gray-800 tracking-tight shrink-0"
          >
            Grocery<span className="text-emerald-500">Shop</span>
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-16 ml-10">
            <Link
              href="/main"
              className={`text-sm font-medium hover:text-emerald-500 transition-colors ${
                pathname === '/main' ? 'text-emerald-500' : 'text-gray-600'
              }`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium hover:text-emerald-500 transition-colors ${
                pathname === '/about' ? 'text-emerald-500' : 'text-gray-600'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Search + Actions */}
          <div className="flex items-center gap-3 ml-auto flex-1 md:flex-none justify-end">
            {/* Search */}
            <div className="relative flex-1 md:flex-none">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={({ currentTarget: { value } }) => setSearch(value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                onBlur={handleSearch}
                placeholder="Search..."
                className="w-full md:w-56 pl-9 pr-3 py-1.5 sm:py-2 rounded-full bg-green-50/80 border border-green-200 text-xs sm:text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>

            {/* Cart */}
            <button
              type="button"
              className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-green-50 border border-green-200 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer shrink-0"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.25 3h1.5l2.25 11.25a1.5 1.5 0 001.5 1.25h8.25a1.5 1.5 0 001.45-1.14l1.5-6.75H7.75"
                />
                <circle cx="8.2" cy="19.5" r="1.5" />
                <circle cx="16.45" cy="19.5" r="1.5" />
              </svg>
            </button>

            {/* Login */}
            <button
              type="button"
              className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-sm shadow-green-200 transition-all cursor-pointer shrink-0"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Nav links — mobile */}
        <nav className="flex md:hidden items-center justify-center gap-8 mt-1 pt-3 pb-1 border-t border-green-100 overflow-x-auto">
          <Link
            href="/main"
            className={`text-sm font-medium whitespace-nowrap hover:text-emerald-500 transition-colors ${
              pathname === '/main' ? 'text-emerald-500' : 'text-gray-500'
            }`}
          >
            Products
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium whitespace-nowrap hover:text-emerald-500 transition-colors ${
              pathname === '/about' ? 'text-emerald-500' : 'text-gray-500'
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
