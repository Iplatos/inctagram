import { FC, useState } from 'react';

import { ConfirmModal } from '@/features/confirm-modal';
import { MyProfilePostCard, MyProfilePostCardProps } from '@/features/post/my-profile-card';
import { useTranslation } from '@/shared/hooks';
import { Replace } from '@/shared/types/helpers';
import { Modal, Typography } from '@/shared/ui';

import s from './my-profile-card-modal.module.scss';

export type MyProfilePostCardModalProps = Replace<
  MyProfilePostCardProps,
  {
    onClose: () => void;
    open: boolean;
  }
>;

export const MyProfilePostCardModal: FC<MyProfilePostCardModalProps> = ({
  description,
  onClose,
  onDeleteMenuItemClick: onDeletePost,
  onEditPost,
  open,
  ...restMyProfileCardProps
}) => {
  const t = useTranslation().t.myProfile.myPostModal;
  const [deletePostModalOpen, setDeletePostModalOpen] = useState(false);

  const handleModalClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handlePostDelete = () => {
    setDeletePostModalOpen(false);
    onDeletePost?.();
  };

  return (
    <>
      <Modal onOpenChange={handleModalClose} open={open}>
        <div className={s.myProfilePosCardWrapper}>
          <MyProfilePostCard
            onClose={() => handleModalClose(false)}
            onDeleteMenuItemClick={() => setDeletePostModalOpen(true)}
            onEditPost={onEditPost}
            {...restMyProfileCardProps}
          />
        </div>
      </Modal>

      <ConfirmModal
        cancelButtonTitle={t.deleteModal.cancelButtonTitle}
        confirmButtonTitle={t.deleteModal.confirmButtonTitle}
        headerTitle={t.deleteModal.title}
        onCancel={() => setDeletePostModalOpen(false)}
        onConfirm={handlePostDelete}
        open={deletePostModalOpen}
      >
        <Typography.Regular16>{t.deleteModal.description}</Typography.Regular16>
      </ConfirmModal>
    </>
  );
};
