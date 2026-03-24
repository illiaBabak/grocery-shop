import Filters from './components/Filters';
import ProductsContent from './components/ProductsContent';

export default function MainPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col lg:flex-row gap-4 px-3 sm:px-4 py-4 sm:py-6">
      <Filters />
      <ProductsContent />
    </div>
  );
}
