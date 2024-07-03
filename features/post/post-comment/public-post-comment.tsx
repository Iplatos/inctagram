import React from 'react';

import { AnswerT, PublicPostAnswer } from './answers';
import { PostComment, PostCommentT } from './post-comment';

export type PublicPostCommentT = {
  answers?: [] | AnswerT[];
} & PostCommentT;

export const PublicPostComment = (props: PublicPostCommentT) => {
  const { answers, ...res } = props;

  return (
    <PostComment {...res}>
      <PublicPostAnswer answers={answers} />
    </PostComment>
  );
};
