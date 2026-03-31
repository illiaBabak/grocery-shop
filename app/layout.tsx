import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/contexts/reactQuery';
import { ToastProvider } from '@/components/Toast';
import { CartProvider } from '@/contexts/cart';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Grocery Shop',
  description: 'Grocery Shop Description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden overflow-y-auto`}
      >
        <CartProvider>
          <ReactQueryProvider>
            <ToastProvider>{children}</ToastProvider>
          </ReactQueryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
