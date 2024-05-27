import { cn } from '@/lib/utils';
import { formatAmountForDisplay } from '@/utils/helpers';
import React, { FC } from 'react';

export interface PricesProps {
  className?: string;
  price: number;
  contentClass?: string;
  salePrice?: number;
}

const Prices: FC<PricesProps> = (props) => {
  const {
    className = '',
    price,
    contentClass = 'py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium',
    salePrice,
  } = props;

  return (
    <div className={`${className}`}>
      <div className={`flex items-center border-2 border-primary-500 rounded-lg ${contentClass}`}>
        {/* TODO: Make the currency from db */}
        <span className={cn('text-primary-500 !leading-none', { 'line-through': salePrice })}>
          {formatAmountForDisplay(price)}
        </span>
        {!!salePrice && (
          <span className="ltr:ml-2 rtl:mr-2 text-primary-500 !leading-none">{formatAmountForDisplay(salePrice)}</span>
        )}
      </div>
    </div>
  );
};

export default Prices;
