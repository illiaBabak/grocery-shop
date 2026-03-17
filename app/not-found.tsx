'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const floatingItems = [
  { emoji: '🥦', top: '8%', left: '10%', size: 'text-5xl' },
  { emoji: '🍅', top: '15%', right: '12%', size: 'text-4xl' },
  { emoji: '🥕', top: '60%', left: '7%', size: 'text-5xl' },
  { emoji: '🍋', top: '70%', right: '10%', size: 'text-4xl' },
  { emoji: '🥑', top: '35%', left: '3%', size: 'text-3xl' },
  { emoji: '🌽', top: '40%', right: '5%', size: 'text-3xl' },
  { emoji: '🍊', bottom: '15%', left: '15%', size: 'text-3xl' },
  { emoji: '🫑', bottom: '20%', right: '15%', size: 'text-4xl' },
];

const produceRow = ['🍎', '🥬', '🧅', '🍇', '🥒'];

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      {/* Background decorative circles */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-green-100/50 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-lime-100/40 blur-3xl" />

      {/* Floating grocery items */}
      {floatingItems.map((item, i) => (
        <motion.span
          key={i}
          className={`absolute select-none opacity-60 ${item.size}`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
          animate={{
            y: [0, -18, -8, -22, 0],
            rotate: [0, i % 2 === 0 ? 5 : -4, i % 2 === 0 ? -3 : 6, i % 2 === 0 ? 3 : -2, 0],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* 404 Number */}
        <div className="flex items-center gap-2 mb-6">
          <motion.span
            className="text-[140px] sm:text-[180px] font-black leading-none bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0 }}
          >
            4
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <motion.span
              className="text-[100px] sm:text-[130px] inline-block select-none"
              animate={{ rotate: [0, -8, 8, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              🛒
            </motion.span>
          </motion.span>

          <motion.span
            className="text-[140px] sm:text-[180px] font-black leading-none bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            4
          </motion.span>
        </div>

        {/* Produce row */}
        <div className="flex gap-3 text-4xl mb-8">
          {produceRow.map((emoji, i) => (
            <motion.span
              key={i}
              className="inline-block cursor-default"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 + i * 0.07 }}
              whileHover={{ scale: 1.3 }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* Message */}
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Oops! This aisle doesn&apos;t exist
        </motion.h2>

        <motion.p
          className="text-gray-500 text-base sm:text-lg mb-10 max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          Looks like this page wandered off the shelves. Let&apos;s get you back to fresh picks!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
