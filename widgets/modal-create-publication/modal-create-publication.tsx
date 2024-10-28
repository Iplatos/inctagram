import { ChangeEvent, ReactElement, useState } from 'react';

import {
  AddPhotoCard,
  CropPhotoCard,
  FilterPhotoCard,
  PGWithCropCropCompleteHandler,
} from '@/features';
import { ConfirmModal } from '@/features/confirm-modal';
import { CreatePostCard } from '@/features/post';
import {
  CreatePostStatus,
  addItem,
  closeModal,
  moveToNextStep,
  moveToPreviousStep,
  removeItem,
  setDescription,
  setError,
  setItemCropParams,
} from '@/shared/api/modal-slice';
import { useAppDispatch } from '@/shared/api/pretyped-redux-hooks';
import { useAppSelector } from '@/shared/api/store';
import { blobToBase64, getPhotoValidationSchema } from '@/shared/helpers';
import { useTranslation } from '@/shared/hooks';
import { Modal, Typography } from '@/shared/ui';

import s from './modal-create-publication.module.scss';

const PHOTO_MAX_SIZE = 20_971_520; // 20 Megabytes

type ValidationErrorsMap = Parameters<typeof getPhotoValidationSchema>[1];

export const ModalCreatePublication = () => {
  const { t } = useTranslation();
  const { descriptionCloseModal, labelCloseModal } = t.post.createPostCard;
  const tCommon = t.common.createPostModal.addPhotoCard;

  const dispatch = useAppDispatch();

  const { description, error, items, open, postStatus } = useAppSelector(state => state.modal);

  const [confirmModalOpen, setConformModalOpen] = useState(false);

  const closeAndResetCreatePostModal = () => dispatch(closeModal());

  const handleCropComplete: PGWithCropCropCompleteHandler = (cropArea, cropAreaPixels, index) => {
    dispatch(setItemCropParams({ cropArea, cropAreaPixels, index }));
  };

  const confirmPublicationPost = () => {
    console.log('Publication', { description });
  };

  const handleCreatePostModalClose = (open: boolean) => {
    if (!open) {
      if (postStatus !== CreatePostStatus.Init) {
        setConformModalOpen(true);
      } else {
        closeAndResetCreatePostModal();
      }
    }
  };

  const selectNextCard = () => dispatch(moveToNextStep());
  const selectPreviousCard = () => dispatch(moveToPreviousStep());

  const handleFileInputChange =
    (errorsMap?: ValidationErrorsMap) => async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        const photoValidationSchema = getPhotoValidationSchema(
          { allowedFormats: ['image/jpeg', 'image/png'] as const, maxSize: PHOTO_MAX_SIZE },
          errorsMap
        );

        const result = photoValidationSchema.safeParse(file);

        if (result.success) {
          // TODO: consider using DataURL link instead of base64
          const src = await blobToBase64(file);

          dispatch(addItem({ filter: 'normal', src }));
          selectNextCard();
        } else {
          dispatch(setError(result.error.issues[0].message));
        }
      }
    };
  const steps: Record<CreatePostStatus, () => ReactElement> = {
    [CreatePostStatus.Cropping]: () => (
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
            // TODO: add validation when adding an item via `CropPhotoCard`
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
          onNextClick={selectNextCard}
          onPrevClick={() => handleCreatePostModalClose(false)}
          // TODO: don't forget to add locales to all cards fields!
          title={'Cropping'}
        />
      </div>
    ),
    [CreatePostStatus.Filter]: () => (
      <div className={s.filterPhotoCardWrapper}>
        <FilterPhotoCard
          items={items}
          onFilterChange={(filter, index) => dispatch(setItemCropParams({ filter, index }))}
          onNextClick={selectNextCard}
          onPrevClick={selectPreviousCard}
        />
      </div>
    ),
    [CreatePostStatus.Init]: () => (
      <div className={s.addPhotoCardWrapper}>
        <AddPhotoCard
          error={error}
          onClose={closeAndResetCreatePostModal}
          onFileInputChange={handleFileInputChange({
            tooBig: () => tCommon.errors.tooBig,
            wrongFormat: () => tCommon.errors.wrongFormat,
          })}
          primaryButtonTitle={t.editProfile.createPublication.primaryButtonTitle}
          title={t.editProfile.createPublication.title}
        />
      </div>
    ),
    [CreatePostStatus.Publication]: () => (
      <div className={s.descriptionPhotoCardWrapper}>
        <CreatePostCard
          description={description}
          items={items}
          onBlur={({ description }) => dispatch(setDescription(description))}
          onPrevClick={selectPreviousCard}
          onPublishPost={confirmPublicationPost}
          publishButtonLabel={t.post.createPostCard.postDescription.titleBtnSubmit}
          title={t.post.createPostCard.labelCard}
          userName={'UserName'}
        />
      </div>
    ),
  };

  return (
    <>
      <Modal onOpenChange={handleCreatePostModalClose} open={open}>
        {steps[postStatus]()}
      </Modal>

      <ConfirmModal
        headerTitle={labelCloseModal}
        onCancel={() => setConformModalOpen(false)}
        onConfirm={() => {
          dispatch(closeModal());
          setConformModalOpen(false);
        }}
        open={confirmModalOpen}
      >
        <Typography.Regular16 className={s.confirmModal}>
          {descriptionCloseModal}
        </Typography.Regular16>
      </ConfirmModal>
    </>
  );
};
