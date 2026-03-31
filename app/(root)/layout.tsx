import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function LayoutWithHeaderAndFooter({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Header />
      <Cart />
      {children}
      <Footer />
    </div>
  );
}
