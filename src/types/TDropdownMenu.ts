import { MenuClickEventHandler } from 'rc-menu/lib/interface';

export type TDropdownMenu = {
  type: 'item' | 'submenu' | 'divider',
  key?: string,
  items?: {
    key?: string,
    onClick?: MenuClickEventHandler,
    icon?: any,
    title?: string
  }[],
  onClick?: MenuClickEventHandler,
  icon?: JSX.Element,
  title?: string
};