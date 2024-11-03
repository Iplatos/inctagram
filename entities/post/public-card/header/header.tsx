import { ThreeDots } from '@/assets/icons/three-dots';
import { IconButton, UserBanner } from '@/shared/ui';
import { DropDown } from '@/shared/ui/drop-down-menu';
import { DropDownMenuItemProps } from '@/shared/ui/drop-down-menu/item/item';

import s from './header.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type PostCardHeaderMenuItem = Pick<
  DropDownMenuItemProps,
  'children' | 'endIcon' | 'onClick' | 'startIcon'
>;

export type PostCardHeaderProps = {
  avatar?: string;
  menuItems?: PostCardHeaderMenuItem[];
  userName: string;
};

export const PostCardHeader = ({ avatar, menuItems, userName }: PostCardHeaderProps) => {
  return (
    <div className={s.root}>
      <UserBanner avatarProps={{ src: avatar }} userName={userName} />

      {menuItems && (
        <DropDown.Menu
          align={'end'}
          trigger={
            <IconButton className={modalCardS.headerIconButton}>
              <ThreeDots />
            </IconButton>
          }
        >
          {menuItems?.map((item, index) => (
            <DropDown.Item key={index} {...item}>
              {item.children}
            </DropDown.Item>
          ))}
        </DropDown.Menu>
      )}
    </div>
  );
};
