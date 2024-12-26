import { FC } from 'react';

import { PrivatePostCard, PrivatePostCardProps } from '@/features/post';
import { useTranslation } from '@/shared/hooks';
import { Replace } from '@/shared/types/helpers';
import { Modal } from '@/shared/ui';

import s from './private-card-modal.module.scss';

export type PrivateCardModalProps = Replace<
  Omit<PrivatePostCardProps, 'onDeleteMenuItemClick'>,
  {
    onClose: () => void;
    onDeletePost?: () => void;
    open: boolean;
  }
>;

export const PrivatePostCardModal: FC<PrivateCardModalProps> = ({
  onClose,
  onDeletePost,
  open,
  ...props
}) => {
  const { cancelEditModal: tEditModal, confirmDeleteModal: tDeleteModal } =
    useTranslation().t.myProfile.myPostModal;

  const handleModalClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <>
      <Modal onOpenChange={handleModalClose} open={open}>
        <div className={s.myProfilePosCardWrapper}>
          <PrivatePostCard {...props} />
        </div>
      </Modal>

      {/*  <ConfirmModal*/}
      {/*    cancelButtonTitle={tDeleteModal.cancelButtonTitle}*/}
      {/*    confirmButtonTitle={tDeleteModal.confirmButtonTitle}*/}
      {/*    headerTitle={tDeleteModal.title}*/}
      {/*    onCancel={onConfirmDeleteModalClose}*/}
      {/*    onConfirm={onPostDeleteCommit}*/}
      {/*    open={state.confirmDeleteModalOpen}*/}
      {/*  >*/}
      {/*    <Typography.Regular16>{tDeleteModal.description}</Typography.Regular16>*/}
      {/*  </ConfirmModal>*/}

      {/*  <ConfirmModal*/}
      {/*    cancelButtonTitle={tEditModal.cancelButtonTitle}*/}
      {/*    confirmButtonTitle={tEditModal.confirmButtonTitle}*/}
      {/*    headerTitle={tEditModal.title}*/}
      {/*    onCancel={onCancelEditModalClose}*/}
      {/*    onConfirm={onResetPostEditingAndClose}*/}
      {/*    open={state.cancelEditModalOpen}*/}
      {/*  >*/}
      {/*    <Typography.Regular16>{tEditModal.description}</Typography.Regular16>*/}
      {/*  </ConfirmModal>*/}
    </>
  );
};
