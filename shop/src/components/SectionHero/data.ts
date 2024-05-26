import { StaticImageData } from 'next/image';
import { Route } from '@/routers/types';
// import imageRightPng3 from '@/images/hero-right-3.png';

import slider1 from '@/images/slider.png';
import { paths } from '@/constants';

interface HeroBannerType {
  image: StaticImageData | string;
  heading: any; // TODO fix type
  subHeading: any; // TODO fix type
  btnText: any; // TODO fix type
  btnLink: Route;
}

export const HERO_BANNER_DATA: HeroBannerType[] = [
  {
    image: slider1,
    heading: 'Summer',
    subHeading: 'Clothing Collection',
    btnText: 'explore_now',
    btnLink: paths.index,
  },
];
