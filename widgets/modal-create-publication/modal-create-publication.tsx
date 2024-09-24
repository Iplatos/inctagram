import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AddPhotoCard, FilterPhotoCard } from '@/features';
import { closeModal } from '@/shared/api/modal-slice';
import { useAppSelector } from '@/shared/api/store';
import { useTranslation } from '@/shared/hooks';
import { Modal, ModalCard } from '@/shared/ui';

import s from './modal-create-publication.module.scss';

enum PostStatus {
  Init,
  Cropping,
  Filter,
  Publication,
}

export const ModalCreatePublication = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const state = useAppSelector(state => state.modal);

  const closeModalHandler = () => {
    dispatch(closeModal(false));
  };

  const [files, setFiles] = useState<File[]>([]);

  const [postStatus, setPostStatus] = useState<PostStatus>(PostStatus.Init);

  // console.log(files);

  /* eslint-disable perfectionist/sort-objects -- preserve the natural order of post creation statuses */

  const steps: Record<PostStatus, () => JSX.Element> = {
    [PostStatus.Init]: () => (
      <AddPhotoCard
        error={null}
        onClose={closeModalHandler}
        onFileInputChange={e => {
          if (e.target.files?.length) {
            const file = e.target.files[0];

            setFiles([...files, file]);
            setPostStatus(PostStatus.Filter);
          }
        }}
        primaryButtonTitle={t.editProfile.createPublication.primaryButtonTitle}
        title={t.editProfile.createPublication.title}
      />
    ),
    [PostStatus.Cropping]: () => <div>Cropping</div>,
    [PostStatus.Filter]: () => (
      <FilterPhotoCard
        items={[
          {
            filter: 'normal',
            src: 'https://images.pexels.com/photos/17756265/pexels-photo-17756265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        ]}
        onNextClick={() => {
          setPostStatus(PostStatus.Publication);
        }}
        onPrevClick={() => {
          setFiles([]);
          setPostStatus(PostStatus.Init);
        }}
      />
    ),
    [PostStatus.Publication]: () => <div>Publication</div>,
  };
  /* eslint-enable perfectionist/sort-objects */

  //<FilterPhotoCard items={[{ filter: 'valencia', src: '' }]} />

  return (
    <Modal.Root classes={{ content: s.modalContent }} onOpenChange={closeModalHandler} open={state}>
      <ModalCard.Root className={s.cardRoot}>{steps[postStatus]()}</ModalCard.Root>
    </Modal.Root>
  );
};
