import React, { ReactNode } from 'react';

import { ThreeDots } from '@/assets/icons/three-dots';
import { extractInitials } from '@/shared/helpers';
import { Avatar, IconButton, Typography } from '@/shared/ui';
import { DropDown } from '@/shared/ui/drop-down-menu';

import s from './header-post-card.module.scss';

export type HeaderPostCardProps = {
  avatar?: string;
  itemsDropDown?: {
    children?: ReactNode;
    endIcon?: ReactNode;
    onClick?: () => void;
    startIcon?: ReactNode;
  }[];
  userName: string;
};

export const HeaderPostCard = (props: HeaderPostCardProps) => {
  const { avatar, itemsDropDown, userName } = props;

  return (
    <div className={s.header}>
      <div style={{ alignItems: 'center', display: 'flex', gap: '12px' }}>
        <Avatar fallback={extractInitials(userName)} size={'small'} src={avatar} />
        <Typography.H3>{userName}</Typography.H3>
      </div>
      {/*<UserBanner userName={userName} avatar={avatar} />*/}
      {itemsDropDown && (
        <DropDown.Menu
          align={'end'}
          trigger={
            <IconButton>
              <ThreeDots />
            </IconButton>
          }
        >
          {itemsDropDown?.map((item, index) => {
            return (
              <DropDown.Item
                endIcon={item.endIcon}
                key={index}
                onClick={item.onClick}
                startIcon={item.startIcon}
              >
                {item.children}
              </DropDown.Item>
            );
          })}
        </DropDown.Menu>
      )}
    </div>
  );
};
