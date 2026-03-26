'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createReviewAction } from './actions';
import { toast } from 'react-toastify';

interface ReviewFormProps {
  userId: string;
  foodId: string;
}

export default function ReviewForm({ userId, foodId }: ReviewFormProps) {
  const [stars, setStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await createReviewAction(foodId, stars, content);

      if (result.success) {
        toast.success('Review submitted successfully!');
        setStars(0);
        setHoveredStar(0);
        setContent('');
      } else {
        toast.error(result.error ?? 'Failed to submit review');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="rounded-2xl liquid-glass p-6 sm:p-8 relative overflow-hidden text-center">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-800 font-semibold text-lg">Want to leave a review?</p>
            <p className="text-gray-500 text-sm mt-1">
              Log in or create an account to share your experience
            </p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Link
              href="/login"
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-full shadow-md shadow-emerald-200 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-300"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 bg-white/60 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 text-sm font-semibold rounded-full transition-all duration-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="rounded-2xl liquid-glass p-6 sm:p-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />

      <div className="relative flex flex-col gap-5">
        <h3 className="text-lg font-semibold text-gray-800">Write a review</h3>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">Your rating</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => {
              const starValue = i + 1;
              const isFilled = starValue <= (hoveredStar || stars);
              return (
                <button
                  key={`review-star-${i}`}
                  type="button"
                  onClick={() => setStars(starValue)}
                  onMouseEnter={() => setHoveredStar(starValue)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="p-0.5 cursor-pointer transition-transform duration-150 hover:scale-110"
                >
                  <svg
                    className={`w-7 h-7 transition-colors duration-150 ${
                      isFilled ? 'text-amber-400' : 'text-gray-200'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              );
            })}
            {stars > 0 && <span className="ml-2 text-sm text-gray-500">{stars} / 5</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="review-content" className="text-sm font-medium text-gray-600">
            Your review
          </label>
          <textarea
            id="review-content"
            name="content"
            value={content}
            onChange={({ currentTarget: { value } }) => setContent(value)}
            placeholder="Share your thoughts about this product..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 text-gray-800 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-300 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading || stars === 0 || content.trim().length === 0}
          className="self-start px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full shadow-md shadow-emerald-200 disabled:shadow-none transition-all duration-200 hover:shadow-lg hover:shadow-emerald-300 cursor-pointer"
        >
          {loading ? 'Submitting...' : 'Submit review'}
        </button>
      </div>
    </form>
  );
}
