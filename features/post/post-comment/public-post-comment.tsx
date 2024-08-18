import React from 'react';

import { PostComment, PostCommentProps } from './post-comment';

export type PublicPostCommentProps = {
  answers?: [] | Omit<PostCommentProps, 'answersSection, answersCount'>[];
} & PostCommentProps;

export const PublicPostComment = (props: PublicPostCommentProps) => {
  const { answers, ...res } = props;

  return (
    <PostComment
      answersCount={answers?.length}
      answersSection={answers?.map((answer, index) => {
        return <PostComment key={index} {...answer} />;
      })}
      {...res}
    />
  );
};
