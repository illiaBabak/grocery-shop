'use client';

import { useState } from 'react';
import { deleteReviewAction } from './actions';
import { toast } from 'react-toastify';

interface DeleteReviewButtonProps {
  reviewId: string;
  foodId: string;
}

export default function DeleteReviewButton({ reviewId, foodId }: DeleteReviewButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const result = await deleteReviewAction(reviewId, foodId);

      if (result.success) {
        toast.success('Review deleted successfully!');
      } else {
        toast.error(result.error ?? 'Failed to delete review');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-150 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-150 cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all duration-150 cursor-pointer"
      title="Delete review"
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
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>
  );
}
