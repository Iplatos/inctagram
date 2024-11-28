import { FC } from 'react';

import {
  MyProfilePostCardContent,
  MyProfilePostCardContentProps,
  MyProfilePostCardEditContent,
  PostCard,
} from '@/entities/post';
import { Replace } from '@/shared/types/helpers';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type MyProfilePostCardProps = Replace<
  MyProfilePostCardContentProps,
  {
    description?: string;
    images: (StaticImport | string)[];
    isEditingPost?: boolean;
    onClose?: () => void;
    onEditCardBackClick?: () => void;
    onEditFormBlur?: (description: string) => void;
    onEditFormFocus?: () => void;
    onEditPost?: (description: string) => void;
  }
>;

export const MyProfilePostCard: FC<MyProfilePostCardProps> = ({
  description,
  isEditingPost = false,
  onClose,
  onEditCardBackClick,
  onEditFormBlur,
  onEditFormFocus,
  onEditPost,
  ...restContentProps
}) => {
  return (
    <PostCard images={restContentProps.images}>
      {isEditingPost ? (
        <MyProfilePostCardEditContent
          avatar={restContentProps.headerProps.avatar}
          editPostFormProps={{
            description,
            onBlur: ({ description }) => onEditFormBlur?.(description),
            onFocus: onEditFormFocus,
            onSubmit: ({ description }) => onEditPost?.(description),
          }}
          onClose={onClose}
          onPrevClick={onEditCardBackClick}
          userName={restContentProps.headerProps.userName}
        />
      ) : (
        <MyProfilePostCardContent {...restContentProps} />
      )}
    </PostCard>
  );
};
