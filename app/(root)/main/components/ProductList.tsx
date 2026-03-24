import { Food } from '@/generated/prisma/client';
import Loader from '@/components/Loader';
import Product from './Product';

type Props = {
  food: Food[];
  isLoading: boolean;
};

export default function ProductList({ food, isLoading }: Props) {
  return (
    <div className="relative flex-1 h-full w-full overflow-y-auto">
      {isLoading && (
        <div className="absolute bottom-4 right-4 z-10">
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 p-1">
        {food.map((item, foodIndex) => (
          <Product key={`${item.id}-${foodIndex}-food`} item={item} />
        ))}
      </div>
    </div>
  );
}
