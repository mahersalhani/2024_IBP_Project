import React from 'react';
import logoImg from '@/images/logo.svg';
import Link from 'next/link';
import Image from 'next/image';

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ img = logoImg, className = 'flex-shrink-0' }) => {
  return (
    <Link href="/" className={`ttnc-logo inline-block text-slate-600 ${className}`}>
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      <Image className={`block h-8 sm:h-10 w-auto`} src={img} alt="Logo" sizes="200px" priority />
    </Link>
  );
};

export default Logo;
