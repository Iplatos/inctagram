import React from 'react';

import { CopyOutline } from '@/assets/icons/copy-outline';
import { PersonAddOutline } from '@/assets/icons/person-add-outline';
import { PersonRemoveOutline } from '@/assets/icons/person-remove-outline';
import {
  HeaderPostCard,
  HeaderPostCardProps,
} from '@/features/post/post-card/header-post-card/header-post-card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';

type FriendsHeaderPostCardProps = {
  isFollow: boolean;
  setCopyLink: () => void;
  toggleIsFollowing: () => void;
} & Omit<HeaderPostCardProps, 'itemsDropDown'>;

export const FriendsHeaderPostCard = (props: FriendsHeaderPostCardProps) => {
  const { isFollow, setCopyLink, toggleIsFollowing } = props;
  const { t } = useTranslation();
  const btnNames = t.post.card.header.buttons;

  return (
    <HeaderPostCard
      {...props}
      itemsDropDown={[
        {
          children: (
            <Typography.Regular14>
              {isFollow ? btnNames.unfollow : btnNames.follow}
            </Typography.Regular14>
          ),
          onClick: toggleIsFollowing,
          startIcon: isFollow ? <PersonRemoveOutline /> : <PersonAddOutline />,
        },
        {
          children: <Typography.Regular14>{btnNames.copyLink}</Typography.Regular14>,
          onClick: setCopyLink,
          startIcon: <CopyOutline />,
        },
      ]}
    />
  );
};
