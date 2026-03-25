'use server';

import { cookies } from 'next/headers';
import { verifyToken, JwtPayload } from '@/lib/jwt';

export async function getUser(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  return verifyToken(token);
}
