import { FC } from 'react';

import { PublicPostCard } from '@/features/post';
import { Post as PublicPost } from '@/shared/types/public.types';
import { Modal } from '@/shared/ui';

import s from './post-modal.module.scss';

export type PublicPagePostModalProps = {
  onClose: () => void;
  open: boolean;
  post: PublicPost;
};

export const PublicPagePostModal: FC<PublicPagePostModalProps> = ({ onClose, open, post }) => {
  const handleModalClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal onOpenChange={handleModalClose} open={open}>
      <div className={s.publicPostCardWrapper}>
        <PublicPostCard
          date={post.createdAt}
          headerProps={{ avatar: post.avatarOwner, userName: post.userName }}
          images={post.images.map(i => i.url)}
          isLiked={post.isLiked}
          likesCount={post.likesCount}
        />
      </div>
    </Modal>
  );
};
