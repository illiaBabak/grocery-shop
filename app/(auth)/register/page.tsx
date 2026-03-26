'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { registerAction, RegisterState } from './actions';

const initialState: RegisterState = {
  errors: {},
  values: { name: '', email: '', password: '', confirmPassword: '' },
  success: false,
};

const floatingItems = [
  { emoji: '🍇', top: '8%', left: '6%', size: 'text-4xl' },
  { emoji: '🥕', top: '18%', right: '8%', size: 'text-3xl' },
  { emoji: '🌽', top: '55%', left: '4%', size: 'text-4xl' },
  { emoji: '🍅', top: '70%', right: '6%', size: 'text-3xl' },
  { emoji: '🥦', bottom: '8%', left: '10%', size: 'text-3xl' },
  { emoji: '🥒', top: '38%', right: '3%', size: 'text-3xl' },
];

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 px-4 py-10 overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-green-100/50 blur-3xl" />

      {floatingItems.map((item, i) => (
        <motion.span
          key={`${item.emoji}-${i}-floating-item`}
          className={`absolute select-none opacity-40 ${item.size} hidden sm:block`}
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
          animate={{
            y: [0, -14, -8, -18, 0],
            rotate: [0, i % 2 === 0 ? -4 : 5, i % 2 === 0 ? 6 : -3, 0],
          }}
          transition={{ duration: 4.5 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.emoji}
        </motion.span>
      ))}

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Link
            href="/main"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to shop
          </Link>
        </motion.div>

        <div className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl shadow-green-100/50 p-8 sm:p-10">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-200 mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create account</h1>
            <p className="text-sm text-gray-500 mt-1">Start shopping fresh today</p>
          </motion.div>

          {/* General error */}
          {state.errors.general && (
            <motion.div
              className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {state.errors.general}
            </motion.div>
          )}

          {/* Form */}
          <form action={formAction} className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                key={`name-${state.success}`}
                defaultValue={state.values.name}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl bg-white/70 border text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:ring-2 ${
                  state.errors.name
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-emerald-400 focus:ring-emerald-100'
                }`}
              />
              {state.errors.name && (
                <motion.p
                  className="mt-1.5 text-xs text-red-500"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {state.errors.name}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                key={`email-${state.success}`}
                defaultValue={state.values.email}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-white/70 border text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:ring-2 ${
                  state.errors.email
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-emerald-400 focus:ring-emerald-100'
                }`}
              />
              {state.errors.email && (
                <motion.p
                  className="mt-1.5 text-xs text-red-500"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {state.errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                key={`password-${state.success}`}
                defaultValue={state.values.password}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl bg-white/70 border text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:ring-2 ${
                  state.errors.password
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-emerald-400 focus:ring-emerald-100'
                }`}
              />
              {state.errors.password && (
                <motion.p
                  className="mt-1.5 text-xs text-red-500"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {state.errors.password}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                key={`confirmPassword-${state.success}`}
                defaultValue={state.values.confirmPassword}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl bg-white/70 border text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:ring-2 ${
                  state.errors.confirmPassword
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-emerald-400 focus:ring-emerald-100'
                }`}
              />
              {state.errors.confirmPassword && (
                <motion.p
                  className="mt-1.5 text-xs text-red-500"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {state.errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed cursor-pointer"
              >
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating account…
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </motion.div>
          </form>

          {/* Footer link */}
          <motion.p
            className="text-center text-sm text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Sign In
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
