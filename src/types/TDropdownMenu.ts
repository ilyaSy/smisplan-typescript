import { MenuClickEventHandler } from 'rc-menu/lib/interface';

type TDropdownMenuItem = {
  type: 'item',
  title: string,
  key: string,
  onClick: MenuClickEventHandler,
  icon?: JSX.Element
}

export type TDropdownMenu =
  TDropdownMenuItem
  | {
    type: 'divider'
    key: string,
  }
  | {
    type: 'submenu',
    title: string,
    key?: string,
    icon?: JSX.Element,
    items: Omit<TDropdownMenuItem, 'type'>[]
  };
