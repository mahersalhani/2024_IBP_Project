import en from '@/messages/en.json';

type TSideNavItem = keyof typeof en.SideNav;

export type SideNavItem = {
  title: TSideNavItem;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
