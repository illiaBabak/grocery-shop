'use server';

import { cookies } from 'next/headers';
import { getUser } from '@/lib/auth/getUser';
import { updateUser } from '@/lib/auth/updateUser';
import { signToken } from '@/lib/jwt';
import { redirect } from 'next/navigation';

export type UpdateNameState = {
  error?: string;
  success: boolean;
};

export async function updateNameAction(
  _prev: UpdateNameState,
  formData: FormData
): Promise<UpdateNameState> {
  const name = (formData.get('name') ?? '').toString().trim();

  if (!name) return { error: 'Name is required', success: false };

  if (name.length < 2) return { error: 'Name must be at least 2 characters', success: false };

  const currentUser = await getUser();

  if (!currentUser) return { error: 'Unauthorized', success: false };

  try {
    const updatedUser = await updateUser(currentUser.userId, { name });

    const token = signToken({
      userId: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
    });

    const cookieStore = await cookies();

    cookieStore.set('grocery-shop-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return { success: true };
  } catch {
    return { error: 'Failed to update name', success: false };
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('grocery-shop-token');

  redirect('/login');
}
