import { ReactNode } from 'react';

import { Card, ScrollAreaContainer } from '@/shared/ui';

import s from './post-card.module.scss';

type PostCardProps = {
  addNewCommentForm?: ReactNode;
  comments: ReactNode;
  header: ReactNode;
  infoSection: ReactNode;
};

export const PostCard = (props: PostCardProps) => {
  const { addNewCommentForm, comments, header, infoSection } = props;

  return (
    <Card.Root className={s.root}>
      <Card.Content className={s.content}>
        <div className={s.gallery}></div>
        <Card.Content className={s.postDetails}>
          <Card.Header className={s.postDetails__header}>{header}</Card.Header>
          <Card.Content className={s.postDetails__comments}>
            <div className={s.commentsList}>{comments}</div>
          </Card.Content>
          <Card.Content className={s.postDetails__infoSection}>{infoSection}</Card.Content>
          {addNewCommentForm && (
            <Card.Content className={s.postDetails__addNewCommentForm}>
              {addNewCommentForm}
            </Card.Content>
          )}
        </Card.Content>
      </Card.Content>
    </Card.Root>
  );
};
