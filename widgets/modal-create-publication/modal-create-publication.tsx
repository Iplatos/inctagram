import React, { ReactElement, useState } from 'react';
import { batch } from 'react-redux';

import {
  AddPhotoCard,
  CropPhotoCard,
  FilterPhotoCard,
  PGWithCropCropCompleteHandler,
} from '@/features';
import { ConfirmModal } from '@/features/confirm-modal';
import { CreatePostCard, EditPostModalCard } from '@/features/post';
import { PublicationCard } from '@/features/publication-card';
import {
  addItem,
  clearItems,
  closeModal,
  removeItem,
  resetItemFilters,
  selectCreatePostModalItems,
  selectCreatePostModalOpen,
  setItemCropParams,
} from '@/shared/api/modal-slice';
import { useAppDispatch, useAppSelector } from '@/shared/api/pretyped-redux-hooks';
import { blobToBase64 } from '@/shared/helpers';
import { useTranslation } from '@/shared/hooks';
import { Modal, Typography } from '@/shared/ui';
import { FocusOutsideEvent, PointerDownOutsideEvent } from '@radix-ui/react-dismissable-layer';

import s from './modal-create-publication.module.scss';

export enum PostStatus {
  Init,
  Cropping,
  Filter,
  Publication,
}

export const ModalCreatePublication = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const open: boolean = useAppSelector(selectCreatePostModalOpen);
  const items = useAppSelector(selectCreatePostModalItems);

  const { descriptionCloseModal, labelCloseModal } = t.post.createPostCard;

  const closeModalHandler = () => {
    dispatch(closeModal());
    setPostStatus(PostStatus.Init);
    setOpenConfirmModal(false);
    //open save draft modal
  };

  const handleInteractOutside = (event: Event) => {
    event.preventDefault();
    setOpenConfirmModal(true);
  };

  // TODO: consider moving the status to the redux store to allow manual reopening of the modal in a certain state.
  const [postStatus, setPostStatus] = useState<PostStatus>(PostStatus.Init);

  const handleCropComplete: PGWithCropCropCompleteHandler = (cropArea, cropAreaPixels, index) => {
    dispatch(setItemCropParams({ cropArea, cropAreaPixels, index }));
  };

  const confirmPublicationPost = () => {
    console.log('Publication');
  };

  const steps: Record<PostStatus, () => ReactElement> = {
    [PostStatus.Cropping]: () => (
      <div className={s.cropPhotoCardWrapper}>
        <CropPhotoCard
          galleryProps={{
            items: items.map(item => {
              const { aspectRatio, cropAreaPixels, src, zoom } = item;

              return {
                cropperProps: { aspectRatio, initialCroppedAreaPixels: cropAreaPixels, zoom },
                original: src,
              };
            }),
            onAspectRatioChange: (aspectRatio, index) =>
              dispatch(setItemCropParams({ aspectRatio, index })),
            onCropComplete: handleCropComplete,
            onItemAdd: src => {
              dispatch(addItem({ filter: 'normal', src }));

              return true;
            },
            onItemRemove: index => {
              dispatch(removeItem(index));

              return true;
            },
            onZoomChange: (zoom, index) => dispatch(setItemCropParams({ index, zoom })),
          }}
          onNextClick={() => setPostStatus(PostStatus.Filter)}
          onPrevClick={() => {
            dispatch(clearItems());
            setPostStatus(PostStatus.Init);
          }}
          // TODO: don't forget to add locales to all cards fields!
          title={'Cropping'}
        />
      </div>
    ),
    [PostStatus.Filter]: () => (
      <div className={s.filterPhotoCardWrapper}>
        <FilterPhotoCard
          items={items}
          onFilterChange={(filter, index) => dispatch(setItemCropParams({ filter, index }))}
          onNextClick={() => {
            setPostStatus(PostStatus.Publication);
          }}
          onPrevClick={() => {
            batch(() => {
              dispatch(resetItemFilters());
              setPostStatus(PostStatus.Cropping);
            });
          }}
        />
      </div>
    ),
    [PostStatus.Init]: () => (
      <div className={s.addPhotoCardWrapper}>
        <AddPhotoCard
          error={null}
          onClose={closeModalHandler}
          onFileInputChange={async e => {
            const file = e.target.files?.[0];

            if (file) {
              const src = await blobToBase64(file);

              dispatch(addItem({ filter: 'normal', src }));
              setPostStatus(PostStatus.Cropping);
            }
          }}
          primaryButtonTitle={t.editProfile.createPublication.primaryButtonTitle}
          title={t.editProfile.createPublication.title}
        />
      </div>
    ),
    [PostStatus.Publication]: () => (
      <div>
        <CreatePostCard
          confirmPublication={confirmPublicationPost}
          items={items}
          onPrevClick={() => {
            batch(() => {
              setPostStatus(PostStatus.Filter);
            });
          }}
          setOpen={closeModalHandler}
          userName={'UserName'}
        />
      </div>
    ),
  };

  return (
    <Modal
      contentProps={{ onInteractOutside: handleInteractOutside }}
      onOpenChange={open => {
        if (!open) {
          closeModalHandler();
        }
      }}
      open={open}
    >
      {steps[postStatus]()}
      <ConfirmModal
        headerTitle={labelCloseModal}
        onCancel={() => setOpenConfirmModal(false)}
        onConfirm={closeModalHandler}
        open={openConfirmModal}
      >
        <Typography.Regular16 className={s.confirmModal}>
          {descriptionCloseModal}
        </Typography.Regular16>
      </ConfirmModal>
    </Modal>
  );
};
