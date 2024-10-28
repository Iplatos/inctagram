import { FC, ReactElement, useState } from 'react';

import { AddPhotoCard, CropPhotoCard, FilterPhotoCard } from '@/features';
import { ConfirmModal } from '@/features/confirm-modal';
import { CreatePostCard } from '@/features/post';
import { CreatePostModalItem, CreatePostStatus } from '@/shared/api/modal-slice';
import { useTranslation } from '@/shared/hooks';
import { Modal, Typography } from '@/shared/ui';

import s from './modal-create-publication.module.scss';

import { useCreatePostModalHandle } from './use-create-post-modal-handle';

type CreatePostModalProps = {
  onPublishPost?: (data: { description?: string; items: CreatePostModalItem[] }) => void;
};

export const ModalCreatePublication: FC<CreatePostModalProps> = ({ onPublishPost }) => {
  const { t } = useTranslation();
  const { descriptionCloseModal, labelCloseModal } = t.post.createPostCard;
  const tCommon = t.common.createPostModal.addPhotoCard;

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
          onNextClick={moveToNextStep}
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
          onFilterChange={onFilterChange}
          onNextClick={moveToNextStep}
          onPrevClick={moveToPreviousStep}
        />
      </div>
    ),
    [CreatePostStatus.Init]: () => (
      <div className={s.addPhotoCardWrapper}>
        <AddPhotoCard
          error={error}
          onClose={closeCreatePostModal}
          onFileInputChange={onFileInputChange({
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
          onBlur={({ description }) => setDescription(description)}
          onPrevClick={moveToPreviousStep}
          onPublishPost={() => onPublishPost?.({ description, items })}
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
        onConfirm={handlePostDraftSave}
        open={confirmModalOpen}
      >
        <Typography.Regular16 className={s.confirmModal}>
          {descriptionCloseModal}
        </Typography.Regular16>
      </ConfirmModal>
    </>
  );
};
