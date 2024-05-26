'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';

import ButtonPrimary from '@/shared/button/ButtonPrimary';
import { useInfiniteGetDesigns } from '@/hooks/product/use-query';
import ProductCard from '@/components/ProductCard';
import Heading from '@/components/Heading/Heading';

const CollectionProducts = () => {
  const { ref, inView } = useInView();

  const t = useTranslations('Common');

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteGetDesigns({
    limit: 20,
    order: 'ASC',
    sort: 'createdAt',
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <div className="my-16">
      <Heading rightDescText={'Discover the latest products'} hasNextPrev>
        New Arrivals
      </Heading>

      {!!data?.pages?.length && (
        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8">
          {data.pages.map((page, i) =>
            page?.results.map((product, j) => (
              <ProductCard data={product} index={i * 3 + j} key={product.id} className="shadow rounded-3xl pb-2" />
            ))
          )}
        </div>
      )}

      {isLoading && (
        <div className="h-48 flex justify-center items-end">
          <ButtonPrimary loading>Loading</ButtonPrimary>
        </div>
      )}

      {hasNextPage && (
        <div className="flex mt-16 justify-center items-center" ref={ref}>
          <ButtonPrimary loading>Loading</ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default CollectionProducts;
