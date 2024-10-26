import React, { useState } from 'react';

import { CopyOutline } from '@/assets/icons/copy-outline';
import { PersonAddOutline } from '@/assets/icons/person-add-outline';
import { PersonRemoveOutline } from '@/assets/icons/person-remove-outline';
import { HeaderPostCard } from '@/features/post/post-card/header-post-card/header-post-card';
import { PrivatePostCard, PrivatePostCardProps } from '@/features/post/post-card/private-post-card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui/typography/typography';

export type FriendPrivatePostCardProps = Omit<PrivatePostCardProps, 'headerSection'>;

export const FriendPrivatePostCard = (props: FriendPrivatePostCardProps) => {
  const { avatar, postId, userName, ...rest } = props;

  const { t } = useTranslation();
  const btnNames = t.post.card.header.buttons;

  const [isFollow, setIsFollowing] = useState(false);
  const setIsFollowingHandler = () => setIsFollowing(!isFollow);
  const setCopyLink = () => console.log('copy-link', postId);

  return (
    <PrivatePostCard
      headerSection={
        <HeaderPostCard
          itemsDropDown={[
            {
              children: (
                <Typography.Regular14>
                  {isFollow ? btnNames.unfollow : btnNames.follow}
                </Typography.Regular14>
              ),
              onClick: setIsFollowingHandler,
              startIcon: isFollow ? <PersonRemoveOutline /> : <PersonAddOutline />,
            },
            {
              children: <Typography.Regular14>{btnNames.copyLink}</Typography.Regular14>,
              onClick: setCopyLink,
              startIcon: <CopyOutline />,
            },
          ]}
          userName={userName}
        />
      }
      postId={postId}
      userName={userName}
      {...rest}
    />
  );
};
