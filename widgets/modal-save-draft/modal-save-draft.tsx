import React from 'react';
import { useDispatch } from 'react-redux';

import { ConfirmModal } from '@/features/confirm-modal';
import { closeModal, openModal } from '@/shared/api/modal-slice';
import { useAppSelector } from '@/shared/api/store';
import { useTranslation } from '@/shared/hooks';
import { Typography } from '@/shared/ui';

export const ModalSaveDraft = (props: any) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const state = useAppSelector(state => state.modal);

  return (
    <>
      <ConfirmModal
        cancelButtonTitle={t.editProfile.draft.cancel}
        confirmButtonTitle={t.editProfile.draft.confirm}
        headerTitle={t.editProfile.draft.title}
        onCancel={() => dispatch(closeModal(false))}
        onConfirm={() => dispatch(closeModal(false))}
        open={state}
      >
        <Typography.Regular16 component={'p'}>{t.editProfile.draft.message}</Typography.Regular16>
      </ConfirmModal>
    </>
  );
};
