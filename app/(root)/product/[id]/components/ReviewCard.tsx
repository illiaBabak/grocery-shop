'use client';

import { useState } from 'react';
import { editReviewAction } from './actions';
import DeleteReviewButton from './DeleteReviewButton';
import { toast } from 'react-toastify';

interface ReviewCardProps {
  review: {
    id: string;
    stars: number;
    content: string;
    createdAt: Date;
    userId: string;
    user: { name: string };
  };
  foodId: string;
  isOwner: boolean;
}

export default function ReviewCard({ review, foodId, isOwner }: ReviewCardProps) {
  const [editing, setEditing] = useState(false);
  const [stars, setStars] = useState(review.stars);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [content, setContent] = useState(review.content);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await editReviewAction(review.id, foodId, stars, content);

      if (result.success) {
        toast.success('Review updated successfully!');
        setEditing(false);
      } else {
        toast.error(result.error ?? 'Failed to edit review');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setStars(review.stars);
    setContent(review.content);
    setHoveredStar(0);
    setEditing(false);
  };

  return (
    <div className="rounded-2xl liquid-glass p-5 sm:p-6 flex flex-col gap-3 relative overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
            {review.user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{review.user.name}</p>
            <p className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!editing && (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={`${review.id}-star-${i}`}
                  className={`w-4 h-4 ${i < review.stars ? 'text-amber-400' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
          {isOwner && !editing && (
            <>
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-full hover:bg-emerald-50 text-gray-300 hover:text-emerald-500 transition-all duration-150 cursor-pointer"
                title="Edit review"
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <DeleteReviewButton reviewId={review.id} foodId={foodId} />
            </>
          )}
        </div>
      </div>

      {editing ? (
        <div className="relative flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">Rating</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => {
                const starValue = i + 1;
                const isFilled = starValue <= (hoveredStar || stars);
                return (
                  <button
                    key={`edit-star-${i}`}
                    type="button"
                    onClick={() => setStars(starValue)}
                    onMouseEnter={() => setHoveredStar(starValue)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="p-0.5 cursor-pointer transition-transform duration-150 hover:scale-110"
                  >
                    <svg
                      className={`w-6 h-6 transition-colors duration-150 ${
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

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 text-gray-800 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-300 transition-all duration-200"
          />

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={loading || stars === 0 || content.trim().length === 0}
              className="px-5 py-2 text-xs font-semibold rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white transition-colors duration-150 cursor-pointer shadow-md shadow-emerald-200 disabled:shadow-none"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-5 py-2 text-xs font-semibold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-150 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="relative text-sm text-gray-600 leading-relaxed">{review.content}</p>
      )}
    </div>
  );
}
