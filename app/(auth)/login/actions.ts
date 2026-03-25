'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginUser } from '@/lib/auth/loginUser';
import { signToken } from '@/lib/jwt';

export type LoginState = {
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
  values: {
    email: string;
    password: string;
  };
  success: boolean;
};

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = (formData.get('email') ?? '').toString();
  const password = (formData.get('password') ?? '').toString();

  const errors: LoginState['errors'] = {};

  if (!email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';

  if (!password.trim()) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

  const values = { email, password };

  if (Object.keys(errors).length > 0) return { errors, values, success: false };

  try {
    const user = await loginUser(email, password);

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
      errors: { general: 'Invalid email or password' },
      values,
      success: false,
    };
  }

  redirect('/');
}
