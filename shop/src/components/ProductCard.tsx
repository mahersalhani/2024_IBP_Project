'use client';

import { StarIcon } from '@heroicons/react/24/solid';

import { Link } from '@/navigation';
import { ProductDto } from '@shoppy/api-client';
import { paths } from '@/constants';

import NcImage from './NcImage/NcImage';
import Prices from './Prices';

export interface ProductCardProps {
  data: ProductDto;

  className?: string;
  isLiked?: boolean;

  index?: number;
}

const ProductCard = ({ className = '', data, isLiked, index }: ProductCardProps) => {
  const { id, name, slug, price, coverImage, description } = data;

  return (
    <>
      <div className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}>
        <Link href={paths.product_detail(slug)} className="absolute inset-0 z-10" />

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={paths.product_detail(slug)} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={coverImage || '/images/products/1.png'}
              className="object-cover w-full h-full drop-shadow-xl duration-700 ease-in-out scale-100 blur-0 grayscale-0"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
              priority={index === 0 || index === 1 || index === 2}
            />
          </Link>
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">{name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{description}</p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={price} />

            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">4.5</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK_VIEW */}
      {/* <ModalQuickView show={showModalQuickView} onCloseModalQuickView={() => setShowModalQuickView(false)} /> */}
    </>
  );
};

export default ProductCard;
