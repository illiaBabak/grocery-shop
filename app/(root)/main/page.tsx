import Filters from './components/Filters';
import ProductToolbar from './components/ProductToolbar';
import ProductList from './components/ProductList';

export default function MainPage() {
  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-row gap-4 w-full px-4 py-6">
      <Filters />
      <div className="flex flex-col w-[80%]">
        <ProductToolbar />
        <ProductList />
      </div>
    </div>
  );
}
