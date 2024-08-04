import { ReactNode } from 'react';

import { Card } from '@/shared/ui';
import clsx from 'clsx';

import s from './post-card.module.scss';

export type PostSlot = 'commentsDetails' | 'commentsSection' | 'formSection' | 'headerSection';
export type PostClasses = { [P in PostSlot]?: string };

type PostCardProps = {
  addNewCommentForm?: ReactNode;
  classes?: PostClasses;
  commentsSection: ReactNode;
  headerSection: ReactNode;
  infoSection: ReactNode;
};
``;

export const PostCard = (props: PostCardProps) => {
  const { addNewCommentForm, classes = {}, commentsSection, headerSection, infoSection } = props;

  const cls = getClassNames(classes);

  return (
    <Card.Root className={s.root}>
      <Card.Content className={s.content}>
        <div className={s.gallery}></div>
        <div className={s.postDetails}>
          <Card.Header className={cls.headerSection}>{headerSection}</Card.Header>
          <Card.Content className={cls.commentsSection}>{commentsSection}</Card.Content>
          <Card.Content className={cls.commentsDetails}>{infoSection}</Card.Content>
          {/* post details ^ */}
          {addNewCommentForm && (
            <Card.Content className={s.addNewCommentSection}>{addNewCommentForm}</Card.Content>
          )}
        </div>
      </Card.Content>
    </Card.Root>
  );
};
const getClassNames = (classes: PostClasses): Required<PostClasses> => ({
  commentsDetails: clsx(s.commentsDetails, classes.commentsDetails),
  commentsSection: clsx(s.commentsSection, classes.commentsSection),
  formSection: clsx(s.addNewCommentSection, classes.formSection),
  headerSection: clsx(s.header, classes.headerSection),
});
