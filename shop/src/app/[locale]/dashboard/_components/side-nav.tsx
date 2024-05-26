'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { LuChevronDown } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { SIDE_NAV_ITEMS } from '@/constants';
import { SideNavItem } from '@/types';
import { cn } from '@/lib/utils';
import { usePathname } from '@/navigation';

const SideNav = () => {
  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
        >
          <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
          <span className="font-bold text-xl hidden md:flex">Logo</span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDE_NAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const t = useTranslations('SideNav');

  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(pathname.includes(item.path));

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? 'bg-zinc-100' : ''
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-lg  flex">{t(item.title)}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex transform transition-transform`}>
              <LuChevronDown size={20} />
            </div>
          </button>

          <motion.div
            initial={false}
            animate={{ height: subMenuOpen ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className={cn('ml-3 flex flex-col overflow-hidden')}
          >
            {item.subMenuItems?.map((subItem, idx) => {
              return (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={cn('flex flex-row space-x-2 items-center py-2 px-4 mt-2 rounded-lg hover:bg-zinc-100', {
                    'bg-zinc-100 font-bold': subItem.path === pathname,
                  })}
                >
                  <span>-</span>
                  <span>{t(subItem.title)}</span>
                </Link>
              );
            })}
          </motion.div>
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? 'bg-zinc-100' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold text-lg flex">{t(item.title)}</span>
        </Link>
      )}
    </div>
  );
};
