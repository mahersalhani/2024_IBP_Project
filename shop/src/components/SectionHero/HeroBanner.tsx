'use client';

// import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Image from 'next/image';
import useInterval from 'react-use/lib/useInterval';
import useBoolean from 'react-use/lib/useBoolean';

import { HERO_BANNER_DATA as DATA } from './data';

import { cn } from '@/lib/utils';
import Button from '@/shared/button/Button';

export interface SectionHero2Props {
  className?: string;
}

const HeroBanner = ({ className = '' }: SectionHero2Props) => {
  // =================
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 5500 : null
  );
  //

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= DATA.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = DATA[index];
    // const item = locale === 'ar' ? AR_DATA[index] : DATA[index];

    if (!isActive) return null;

    return (
      <div key={index}>
        <div
          // onClick={() => {
          //   router.push(item.btnLink);
          // }}
          key={index}
          className={cn(
            `nc-SectionHero2Item nc-SectionHero2Item--animation flex lg:flex-col relative overflow-hidden`,
            // `bg-cover bg-center rtl:translate-x-1/2 container rounded-2xl mt-8 min-h-[20rem] md:min-h-[30rem] lg:min-h-[40rem]`,
            `bg-cover bg-center  rounded-2xl mt-8 `,
            className
          )}
        >
          <Image
            priority={index === 0}
            src={item.image}
            alt={item.heading}
            fill
            className="object-cover"
            quality={100}
            placeholder="blur"
          />

          {/* <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20 flex justify-center">
            {DATA.map((_, index) => {
              const isActive = indexActive === index;

              return (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndexActive(index);
                    handleAfterClick();
                  }}
                  className={`relative px-1 py-1.5 cursor-pointer`}
                >
                  <div className={`relative w-20 h-1 shadow-sm rounded-md bg-white`}>
                    {isActive && (
                      <div
                        className={`nc-SectionHero2Item__dot absolute inset-0 bg-primary-500 rounded-md ${
                          isActive ? ' ' : ' '
                        }`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div> */}

          {/* <Prev
            className="absolute start-1 sm:start-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-secondary-700"
            btnClassName="w-12 h-12 hover:border-secondary-400 dark:hover:border-secondary-400"
            svgSize="w-6 h-6"
            onClickPrev={handleClickPrev}
          />
          <Next
            className="absolute end-1 sm:end-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-secondary-700"
            btnClassName="w-12 h-12 hover:border-secondary-400 dark:hover:border-secondary-400"
            svgSize="w-6 h-6"
            onClickNext={handleClickNext}
          /> */}

          <div className="relative container py-14 sm:py-20 lg:py-44 text-center">
            <div>
              <h2
                className="nc-SectionHero2Item__heading font-semibold text-5xl lg:text-9xl text-primary-500 rtl:leading-[1.3]"
                dangerouslySetInnerHTML={{ __html: item.heading }}
              />

              <span className="nc-SectionHero2Item__subheading block text-lg lg:text-6xl text-slate-700 font-medium">
                {item.subHeading}
              </span>
            </div>

            <Button href={item.btnLink} className={cn('border border-primary-500 !rounded-lg mt-2 md:mt-10')}>
              <span className={cn('text-primary-500 font-bold text-base md:text-xl')}>Explore Now</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return <>{DATA.map((_, index) => renderItem(index))}</>;
};

export default HeroBanner;
