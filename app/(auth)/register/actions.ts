'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { registerUser } from '@/lib/auth/registerUser';
import { signToken } from '@/lib/jwt';

export type RegisterState = {
  errors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  };
  values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  success: boolean;
};

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = (formData.get('name') ?? '').toString();
  const email = (formData.get('email') ?? '').toString();
  const password = (formData.get('password') ?? '').toString();
  const confirmPassword = (formData.get('confirmPassword') ?? '').toString();

  const errors: RegisterState['errors'] = {};

  if (!name.trim()) errors.name = 'Name is required';
  else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters';

  if (!email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';

  if (!password.trim()) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

  if (!confirmPassword.trim()) errors.confirmPassword = 'Please confirm your password';
  else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

  const values = { name, email, password, confirmPassword };

  if (Object.keys(errors).length > 0) return { errors, values, success: false };

  try {
    const user = await registerUser(name.trim(), email, password);

    const token = signToken({ userId: user.id, email: user.email, name: user.name });

    const cookieStore = await cookies();

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
  } catch {
    return {
      errors: { general: 'User with this email already exists' },
      values,
      success: false,
    };
  }

  redirect('/');
}
