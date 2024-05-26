import { LuHome, LuPackage, LuUser } from 'react-icons/lu';

import { SideNavItem } from '@/types';

import { paths } from './paths';

export const SIDE_NAV_ITEMS: SideNavItem[] = [
  {
    title: 'home',
    path: paths.dashboard.index,
    icon: <LuHome size={24} />,
  },
  {
    title: 'users',
    path: paths.users.index,
    icon: <LuUser size={24} />,
  },
  {
    title: 'products',
    path: paths.products.index,
    icon: <LuPackage size={24} />,
    submenu: true,
    subMenuItems: [
      { title: 'list', path: paths.products.index },
      { title: 'add', path: paths.products.add },
    ],
  },
  // {
  //   title: 'Projects',
  //   path: '/projects',
  //   icon: <LuFolder size={24} />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'All', path: '/projects' },
  //     { title: 'Web Design', path: '/projects/web-design' },
  //     { title: 'Graphic Design', path: '/projects/graphic-design' },
  //   ],
  // },
  // {
  //   title: 'Messages',
  //   path: '/messages',
  //   icon: <LuMail size={24} />,
  // },
  // {
  //   title: 'Settings',
  //   path: '/settings',
  //   icon: <LuSettings size={24} />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'Account', path: '/settings/account' },
  //     { title: 'Privacy', path: '/settings/privacy' },
  //   ],
  // },
  // {
  //   title: 'Help',
  //   path: '/help',
  //   icon: <LuHelpCircle size={24} />,
  // },
];
