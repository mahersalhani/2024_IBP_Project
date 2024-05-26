import HeroBanner from '@/components/SectionHero/HeroBanner';
import { Suspense } from 'react';
import CollectionProducts from './_components/collection-products';

export default function Home() {
  return (
    <div className="relative overflow-hidden container">
      <HeroBanner />

      <Suspense fallback={<div>Loading...</div>}>
        <CollectionProducts />
      </Suspense>
    </div>
  );
}
