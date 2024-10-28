import { FC, ReactElement, useState } from 'react';

import {
  AddPhotoCard,
  ConfirmModal,
  CropPhotoCard,
  DescriptionPhotoCard,
  FilterPhotoCard,
} from '@/features';
import { CreatePostModalItem, CreatePostStatus } from '@/shared/api/modal-slice';
import { useTranslation } from '@/shared/hooks';
import { Modal, Typography } from '@/shared/ui';

import s from './create-post-modal.module.scss';

import { useCreatePostModalHandle } from './use-create-post-modal-handle';

type CreatePostModalProps = {
  onPublishPost?: (data: { description?: string; items: CreatePostModalItem[] }) => void;
};

export const CreatePostModal: FC<CreatePostModalProps> = ({ onPublishPost }) => {
  const t = useTranslation().t.common.createPostModal;

  const {
    handlers: {
      closeModal: closeCreatePostModal,
      moveToNextStep,
      moveToPreviousStep,
      onAspectRatioChange,
      onCropAreaChange,
      onFileInputChange,
      onFilterChange,
      onItemAdd,
      onItemRemove,
      onZoomChange,
      setDescription,
    },
    state: { description, error, items, open, postStatus },
  } = useCreatePostModalHandle();

  const [confirmModalOpen, setConformModalOpen] = useState(false);

  const handleCreatePostModalClose = (open: boolean) => {
    if (!open) {
      if (postStatus !== CreatePostStatus.Init) {
        setConformModalOpen(true);
      } else {
        closeCreatePostModal();
      }
    }
  };

  const handlePostDraftSave = () => {
    // Add logic to save a draft post in the future
    closeCreatePostModal();
    setConformModalOpen(false);
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
            onAspectRatioChange,
            onCropComplete: onCropAreaChange,
            // TODO: add validation when adding an item via `CropPhotoCard`
            onItemAdd,
            onItemRemove,
            onZoomChange,
          }}
          nextButtonTitle={t.cropPhotoCard.buttons.next}
          onNextClick={moveToNextStep}
          onPrevClick={() => handleCreatePostModalClose(false)}
          title={t.cropPhotoCard.title}
        />
      </div>
    ),
    [CreatePostStatus.Filter]: () => (
      <div className={s.filterPhotoCardWrapper}>
        <FilterPhotoCard
          items={items}
          nextButtonTitle={t.filterPhotoCard.buttons.next}
          onFilterChange={onFilterChange}
          onNextClick={moveToNextStep}
          onPrevClick={moveToPreviousStep}
          title={t.filterPhotoCard.title}
        />
      </div>
    ),
    [CreatePostStatus.Init]: () => (
      <div className={s.addPhotoCardWrapper}>
        <AddPhotoCard
          error={error}
          onClose={closeCreatePostModal}
          onFileInputChange={onFileInputChange({
            tooBig: () => t.addPhotoCard.errors.tooBig,
            wrongFormat: () => t.addPhotoCard.errors.wrongFormat,
          })}
          primaryButtonTitle={t.addPhotoCard.buttons.primary}
          title={t.addPhotoCard.title}
        />
      </div>
    ),
    [CreatePostStatus.Publication]: () => (
      <div className={s.descriptionPhotoCardWrapper}>
        <DescriptionPhotoCard
          description={description}
          editPostFormProps={{
            textFieldProps: {
              error: t.publishPhotoCard.descriptionField.errors.tooBig,
              label: t.publishPhotoCard.descriptionField.label,
              placeholder: t.publishPhotoCard.descriptionField.placeholder,
            },
          }}
          items={items}
          onBlur={({ description }) => setDescription(description)}
          onPrevClick={moveToPreviousStep}
          onPublishPost={() => onPublishPost?.({ description, items })}
          publishButtonLabel={t.publishPhotoCard.buttons.publish}
          title={t.publishPhotoCard.title}
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
        cancelButtonTitle={t.saveDraftSubModal.buttons.cancel}
        confirmButtonTitle={t.saveDraftSubModal.buttons.confirm}
        headerTitle={t.saveDraftSubModal.title}
        onCancel={() => setConformModalOpen(false)}
        onConfirm={handlePostDraftSave}
        open={confirmModalOpen}
      >
        <Typography.Regular16 className={s.confirmModal}>
          {t.saveDraftSubModal.message}
        </Typography.Regular16>
      </ConfirmModal>
    </>
  );
};
