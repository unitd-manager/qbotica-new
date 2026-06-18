// app/page.tsx
import HeroCube from './HeroVisualizer';

export default function Heronew() {
  return (
    <section className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <HeroCube />
      </div>
    </section>
  );
}
