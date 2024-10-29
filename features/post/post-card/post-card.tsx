import { ReactNode } from 'react';

import { PhotoGallery } from '@/features/photo-gallery';
import { ModalCard } from '@/shared/ui';
import clsx from 'clsx';

import s from './post-card.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type PostSlot = 'commentsDetails' | 'commentsSection' | 'formSection' | 'headerSection';
export type PostClasses = { [P in PostSlot]?: string };

type PostCardProps = {
  addNewCommentForm?: ReactNode;
  classes?: PostClasses;
  commentsSection: ReactNode;
  headerSection: ReactNode;
  infoSection: ReactNode;
};

export const PostCard = ({
  addNewCommentForm,
  classes = {},
  commentsSection,
  headerSection,
  infoSection,
}: PostCardProps) => {
  const cls = getClassNames(classes);

  const img = [
    'https://images.pexels.com/photos/27308308/pexels-photo-27308308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/27043375/pexels-photo-27043375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/27350492/pexels-photo-27350492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  return (
    <ModalCard.Root className={s.cardRoot}>
      <div className={s.outerWrapper}>
        <PhotoGallery additionalClass={s.gallery} items={img.map(i => ({ original: i }))} />

        <div className={s.contentWrapper}>
          <ModalCard.Header>{headerSection}</ModalCard.Header>
          <ModalCard.Content className={clsx(cls.commentsSection, modalCardS.contentScrollable)}>
            {commentsSection}
          </ModalCard.Content>
          <ModalCard.Content className={cls.commentsDetails}>{infoSection}</ModalCard.Content>
          {addNewCommentForm && (
            <ModalCard.Content className={s.addNewCommentSection}>
              {addNewCommentForm}
            </ModalCard.Content>
          )}
        </div>
      </div>
    </ModalCard.Root>
  );
};

const getClassNames = (classes: PostClasses): Required<PostClasses> => ({
  commentsDetails: clsx(s.commentsDetails, classes.commentsDetails),
  commentsSection: clsx(s.commentsSection, classes.commentsSection),
  formSection: clsx(s.addNewCommentSection, classes.formSection),
  headerSection: clsx(s.header, classes.headerSection),
});
