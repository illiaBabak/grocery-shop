import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWithHeaderAndFooter({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
