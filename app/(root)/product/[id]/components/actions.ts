'use server';

import { createReview } from '@/lib/reviews/createReview';
import { deleteReview } from '@/lib/reviews/deleteReview';
import { editReview } from '@/lib/reviews/editReview';
import { getUser } from '@/lib/auth/getUser';
import { revalidatePath } from 'next/cache';

interface ActionResult {
  success: boolean;
  error?: string;
}

export const createReviewAction = async (
  foodId: string,
  stars: number,
  content: string
): Promise<ActionResult> => {
  const user = await getUser();

  if (!user) return { success: false, error: 'You must be logged in' };

  if (!stars || !content) {
    return { success: false, error: 'Please provide a rating and review text' };
  }

  try {
    await createReview(foodId, user.userId, stars, content);
    revalidatePath(`/product/${foodId}`);
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to create review' };
  }
};

export const editReviewAction = async (
  reviewId: string,
  foodId: string,
  stars: number,
  content: string
): Promise<ActionResult> => {
  const user = await getUser();

  if (!user) return { success: false, error: 'You must be logged in' };

  if (!stars || !content) {
    return { success: false, error: 'Please provide a rating and review text' };
  }

  try {
    await editReview(reviewId, stars, content);
    revalidatePath(`/product/${foodId}`);
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to edit review' };
  }
};

export const deleteReviewAction = async (
  reviewId: string,
  foodId: string
): Promise<ActionResult> => {
  const user = await getUser();

  if (!user) return { success: false, error: 'You must be logged in' };

  try {
    await deleteReview(reviewId);
    revalidatePath(`/product/${foodId}`);
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete review' };
  }
};
