import { EditOutline } from '@/assets/icons/edit-outline';
import { TrashOutline } from '@/assets/icons/trash-outline';
import { HeaderPostCard } from '@/features/post/post-card/header-post-card/header-post-card';
import { PrivatePostCard, PrivatePostCardProps } from '@/features/post/post-card/private-post-card';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';

export type ProfilePrivatePostCardProps = {
  onDeletePostClick?: () => void;
  onEditPostClick?: () => void;
} & Omit<PrivatePostCardProps, 'headerSection'>;

export const ProfilePrivatePostCard = ({
  avatar,
  onDeletePostClick,
  onEditPostClick,
  postId,
  userName,
  ...rest
}: ProfilePrivatePostCardProps) => {
  const { t } = useTranslation();
  const btnNames = t.post.card.header.buttons;

  return (
    <PrivatePostCard
      headerSection={
        <HeaderPostCard
          avatar={avatar}
          itemsDropDown={[
            {
              children: <Typography.Regular14>{btnNames.editPost}</Typography.Regular14>,
              onClick: onEditPostClick,
              startIcon: <EditOutline />,
            },
            {
              children: <Typography.Regular14>{btnNames.deletePost}</Typography.Regular14>,
              onClick: onDeletePostClick,
              startIcon: <TrashOutline />,
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
