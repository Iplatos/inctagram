import { FC, useState } from 'react';

import {
  MyProfilePostCardContent,
  MyProfilePostCardContentProps,
  MyProfilePostCardEditContent,
  PostCard,
} from '@/entities/post';
import { Replace } from '@/shared/types/helpers';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type MyProfilePostCardProps = Replace<
  Omit<MyProfilePostCardContentProps, 'onEditMenuItemClick'>,
  {
    description?: string;
    images: (StaticImport | string)[];
    onClose?: () => void;
    onEditPost?: (description: string) => void;
  }
>;

export const MyProfilePostCard: FC<MyProfilePostCardProps> = ({
  description,
  onClose,
  onEditPost,
  ...restContentProps
}) => {
  const [isEditingPost, setIsEditingPost] = useState(false);

  return (
    <PostCard images={restContentProps.images}>
      {isEditingPost ? (
        <MyProfilePostCardEditContent
          avatar={restContentProps.headerProps.avatar}
          editPostFormProps={{
            description,
            onSubmit: ({ description }) => onEditPost?.(description),
          }}
          onClose={onClose}
          onPrevClick={() => setIsEditingPost(false)}
          userName={restContentProps.headerProps.userName}
        />
      ) : (
        <MyProfilePostCardContent
          onEditMenuItemClick={() => setIsEditingPost(true)}
          {...restContentProps}
        />
      )}
    </PostCard>
  );
};
