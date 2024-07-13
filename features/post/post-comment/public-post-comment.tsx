import React from 'react';

import { AnswerProps, PublicPostAnswer } from './answers';
import { PostComment, PostCommentProps } from './post-comment';

export type PublicPostCommentProps = {
  answers?: [] | AnswerProps[];
} & PostCommentProps;

export const PublicPostComment = (props: PublicPostCommentProps) => {
  const { answers, ...res } = props;

  return (
    <PostComment {...res}>
      <PublicPostAnswer answers={answers} />
    </PostComment>
  );
};
