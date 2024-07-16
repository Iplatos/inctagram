import React from 'react';

import { EditOutline } from '@/assets/icons/edit-outline';
import { TrashOutline } from '@/assets/icons/trash-outline';
import {
  HeaderPostCard,
  HeaderPostCardProps,
} from '@/features/post/post-card/header-post-card/header-post-card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';

type MyHeaderPostCardProps = {
  deletePost: () => void;
  openEditPostCard: () => void;
} & Omit<HeaderPostCardProps, 'itemsDropDown'>;

export const MyHeaderPostCard = (props: MyHeaderPostCardProps) => {
  const { deletePost, openEditPostCard } = props;
  const { t } = useTranslation();
  const btnNames = t.post.card.header.buttons;

  return (
    <HeaderPostCard
      {...props}
      itemsDropDown={[
        {
          children: <Typography.Regular14>{btnNames.editPost}</Typography.Regular14>,
          onClick: openEditPostCard,
          startIcon: <EditOutline />,
        },
        {
          children: <Typography.Regular14>{btnNames.deletePost}</Typography.Regular14>,
          onClick: deletePost,
          startIcon: <TrashOutline />,
        },
      ]}
    />
  );
};
