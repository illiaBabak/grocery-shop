import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { Suspense } from 'react';

export default function LayoutWithHeaderAndFooter({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Cart />
      {children}
      <Footer />
    </div>
  );
}
