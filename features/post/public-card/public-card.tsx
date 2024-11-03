import { FC } from 'react';

import {
  PostCard,
  PostCardActionsAndSummary,
  PostCardHeader,
  PostCardHeaderProps,
  PostComment,
  PostCommentType,
} from '@/entities/post';
import { ModalCard } from '@/shared/ui';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import postCardS from '@/entities/post/card/card.module.scss';

type PostCommentWithAnswers = PostCommentType & { answers?: PostCommentType[] };

export type PublicPostCardProps = {
  comments?: PostCommentWithAnswers[];
  date: Date | number | string;
  headerProps: Omit<PostCardHeaderProps, 'itemsDropDown'>;
  images: (StaticImport | string)[];
  isLiked: boolean;
  likesCount?: number;
};

export const PublicPostCard: FC<PublicPostCardProps> = ({
  comments,
  date,
  headerProps,
  images,
  isLiked,
  likesCount,
}) => {
  const likedUsersData = comments
    ?.slice(0, 3)
    .map(({ avatar, userName }) => ({ avatar, userName }));

  return (
    <PostCard images={images}>
      <ModalCard.Header>
        <PostCardHeader {...headerProps} />
      </ModalCard.Header>

      <ModalCard.Content className={postCardS.commentsList}>
        {comments?.map((comment, index) => <PostComment {...comment} key={index} />)}
      </ModalCard.Content>

      <ModalCard.Content>
        <PostCardActionsAndSummary
          date={date}
          hideControls
          isLiked={isLiked}
          likesCount={likesCount}
          usersData={likedUsersData}
        />
      </ModalCard.Content>
    </PostCard>
  );
};
