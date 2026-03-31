import { CheckoutToasts } from './components/CheckoutToasts';
import Filters from './components/Filters';
import ProductsContent from './components/ProductsContent';
import { Suspense } from 'react';

export default function MainPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col lg:flex-row gap-4 px-3 sm:px-4 py-4 sm:py-6">
      <Suspense fallback={null}>
        <CheckoutToasts />
      </Suspense>
      <Filters />
      <ProductsContent />
    </div>
  );
}
