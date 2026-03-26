'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { loginAction, LoginState } from './actions';

const initialState: LoginState = {
  errors: {},
  values: { email: '', password: '' },
  success: false,
};

const floatingItems = [
  { emoji: '🥬', top: '10%', left: '8%', size: 'text-4xl' },
  { emoji: '🍊', top: '20%', right: '10%', size: 'text-3xl' },
  { emoji: '🥑', top: '65%', left: '5%', size: 'text-4xl' },
  { emoji: '🍋', top: '75%', right: '8%', size: 'text-3xl' },
  { emoji: '🫑', bottom: '10%', left: '12%', size: 'text-3xl' },
  { emoji: '🍎', top: '40%', right: '4%', size: 'text-3xl' },
];

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 px-4 py-10 overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-green-100/50 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-100/50 blur-3xl" />
      {floatingItems.map((item, i) => (
        <motion.span
          key={`${item.emoji}-${i}-floating-item`}
          className={`absolute select-none opacity-40 ${item.size} hidden sm:block`}
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
          animate={{
            y: [0, -16, -6, -20, 0],
            rotate: [0, i % 2 === 0 ? 5 : -4, i % 2 === 0 ? -3 : 6, 0],
          }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
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
                    Signing in…
                  </span>
                ) : (
                  'Sign In'
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
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Sign Up
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
