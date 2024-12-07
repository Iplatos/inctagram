import { DropDownMenuItem } from './item/item';
import { Menu } from './menu/menu';
import { Separator } from './separator/separator';

export const DropDown = Object.assign(Menu, {
  Item: DropDownMenuItem,
  Menu,
  Separator,
});
