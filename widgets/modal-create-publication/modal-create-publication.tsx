import React from 'react';
import { useDispatch } from 'react-redux';

import { AddPhotoCard } from '@/features';
import { closeModal } from '@/shared/api/modal-slice';
import { useAppSelector } from '@/shared/api/store';
import { useTranslation } from '@/shared/hooks';
import { Modal, ModalCard } from '@/shared/ui';

import s from './modal-create-publication.module.scss';

export const ModalCreatePublication = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const state = useAppSelector(state => state.modal);

  const closeModalHandler = () => {
    dispatch(closeModal(false));
  };

  return (
    <Modal.Root classes={{ content: s.modalContent }} onOpenChange={closeModalHandler} open={state}>
      <ModalCard.Root className={s.cardRoot}>
        <AddPhotoCard
          error={null}
          onClose={closeModalHandler}
          primaryButtonTitle={t.editProfile.createPublication.primaryButtonTitle}
          title={t.editProfile.createPublication.title}
        />
      </ModalCard.Root>
    </Modal.Root>
  );
};
