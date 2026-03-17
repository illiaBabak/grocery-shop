import HeroContent from './components/HeroContent';
import HeroBasket from './components/HeroBasket';

export default function StartPage() {
  return (
    <section className="h-[calc(100vh-64px)] bg-gradient-to-br from-green-50/60 via-white to-emerald-50/40 overflow-hidden">
      <div className="mx-auto max-w-7xl h-full w-full px-6 grid grid-cols-1 md:grid-cols-[2fr_3fr] items-center">
        <div className="mb-18 sm:mb-22">
          <HeroContent />
        </div>
        <div className="relative w-full h-full">
          <HeroBasket />
        </div>
      </div>
    </section>
  );
}
