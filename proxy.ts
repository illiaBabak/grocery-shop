import { NextRequest, NextResponse } from 'next/server';

const AUTH_PAGES = ['/login', '/register'];
const PROTECTED_PAGES = ['/user'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  if (token && AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && PROTECTED_PAGES.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/user/:path*'],
};
