import { FC, ReactNode, useState } from 'react';

import { ConfirmModal } from '@/features/confirm-modal';
import { EditPostCard } from '@/features/post/edit-post-card';
import { MyProfilePostCard, MyProfilePostCardProps } from '@/features/post/my-profile-card';
import { useTranslation } from '@/shared/hooks';
import { Modal, Typography } from '@/shared/ui';

import s from './my-profile-card-modal.module.scss';

enum MyProfilePostStatus {
  Browsing,
  Editing,
}

export type MyProfilePostCardModalProps = {
  description?: string;
  onClose: () => void;
  onEditPostSubmit?: (description: string) => void;
  open: boolean;
} & Omit<MyProfilePostCardProps, 'onEditPost'>;

export const MyProfilePostCardModal: FC<MyProfilePostCardModalProps> = ({
  description,
  onClose,
  onDeletePost,
  onEditPostSubmit,
  open,
  ...restMyProfileCardProps
}) => {
  const t = useTranslation().t.myProfile.myPostModal;
  const [status, setStatus] = useState<MyProfilePostStatus>(MyProfilePostStatus.Browsing);
  const [deletePostModalOpen, setDeletePostModalOpen] = useState(false);

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setStatus(MyProfilePostStatus.Browsing);
      onClose();
    }
  };

  const handlePostDelete = () => {
    setDeletePostModalOpen(false);
    onDeletePost?.();
  };

  const contentToStatusMap: Record<MyProfilePostStatus, () => ReactNode> = {
    [MyProfilePostStatus.Browsing]: () => (
      <MyProfilePostCard
        onDeletePost={() => setDeletePostModalOpen(true)}
        onEditPost={() => setStatus(MyProfilePostStatus.Editing)}
        {...restMyProfileCardProps}
      />
    ),
    [MyProfilePostStatus.Editing]: () => (
      <EditPostCard
        avatar={restMyProfileCardProps.headerProps.avatar}
        editPostFormProps={{
          description,
          onSubmit: ({ description }) => onEditPostSubmit?.(description),
        }}
        images={restMyProfileCardProps.images}
        onClose={() => setStatus(MyProfilePostStatus.Browsing)}
        userName={restMyProfileCardProps.headerProps.userName}
      />
    ),
  };

  return (
    <>
      <Modal onOpenChange={handleModalClose} open={open}>
        <div className={s.myProfilePosCardWrapper}>{contentToStatusMap[status]()}</div>
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
