import React from 'react';

import { PostComment, PostCommentProps } from './post-comment';
import { Answer } from './post-comment.types';

export type PublicPostCommentProps = {
  answers?: [] | Answer[];
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
