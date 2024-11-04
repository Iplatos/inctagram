import { FC } from 'react';

import { ConfirmModal } from '@/features/confirm-modal';
import { MyProfilePostCard, MyProfilePostCardProps } from '@/features/post/my-profile-card';
import { useTranslation } from '@/shared/hooks';
import { Replace } from '@/shared/types/helpers';
import { Modal, Typography } from '@/shared/ui';

import s from './my-profile-card-modal.module.scss';

import { useMyProfileCardModalHandle } from './use-my-profile-card-modal-handle';

export type MyProfilePostCardModalProps = Replace<
  Omit<MyProfilePostCardProps, 'onDeleteMenuItemClick'>,
  {
    onClose: () => void;
    onDeletePost?: () => void;
    open: boolean;
  }
>;

export const MyProfilePostCardModal: FC<MyProfilePostCardModalProps> = ({
  description: initialDescription = '',
  onClose,
  onDeletePost,
  open,
  ...props
}) => {
  const { cancelEditModal: tEditModal, confirmDeleteModal: tDeleteModal } =
    useTranslation().t.myProfile.myPostModal;

  const {
    handlers: {
      onAttemptToClose,
      onCancelEditModalClose,
      onConfirmDeleteModalClose,
      onConfirmDeleteModalOpen,
      onEditCardBackClick,
      onFormBlur,
      onFormFocus,
      onPostDeleteCommit,
      onResetPostEditingAndClose,
      onSwitchToEditMode,
    },
    state,
  } = useMyProfileCardModalHandle({ initialDescription, onClose, onDeletePost });

  const handleModalClose = (open: boolean) => {
    if (!open) {
      onAttemptToClose();
    }
  };

  return (
    <>
      <Modal onOpenChange={handleModalClose} open={open}>
        <div className={s.myProfilePosCardWrapper}>
          <MyProfilePostCard
            description={initialDescription}
            isEditingPost={state.isEditing}
            onClose={onAttemptToClose}
            onDeleteMenuItemClick={onConfirmDeleteModalOpen}
            onEditCardBackClick={onEditCardBackClick}
            onEditFormBlur={onFormBlur}
            onEditFormFocus={onFormFocus}
            onEditMenuItemClick={onSwitchToEditMode}
            {...props}
          />
        </div>
      </Modal>

      <ConfirmModal
        cancelButtonTitle={tDeleteModal.cancelButtonTitle}
        confirmButtonTitle={tDeleteModal.confirmButtonTitle}
        headerTitle={tDeleteModal.title}
        onCancel={onConfirmDeleteModalClose}
        onConfirm={onPostDeleteCommit}
        open={state.confirmDeleteModalOpen}
      >
        <Typography.Regular16>{tDeleteModal.description}</Typography.Regular16>
      </ConfirmModal>

      <ConfirmModal
        cancelButtonTitle={tEditModal.cancelButtonTitle}
        confirmButtonTitle={tEditModal.confirmButtonTitle}
        headerTitle={tEditModal.title}
        onCancel={onCancelEditModalClose}
        onConfirm={onResetPostEditingAndClose}
        open={state.cancelEditModalOpen}
      >
        <Typography.Regular16>{tEditModal.description}</Typography.Regular16>
      </ConfirmModal>
    </>
  );
};
