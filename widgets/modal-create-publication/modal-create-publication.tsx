import { ReactElement, useMemo, useState } from 'react';

import {
  AddPhotoCard,
  CropPhotoCard,
  FilterPhotoCard,
  PGWithCropCropCompleteHandler,
} from '@/features';
import { CreatePostCard } from '@/features/post';
import {
  addItem,
  clearItems,
  closeModal,
  removeItem,
  resetItemFilters,
  selectCreatePostModalDescription,
  selectCreatePostModalItems,
  selectCreatePostModalOpen,
  setDescription,
  setItemCropParams,
} from '@/shared/api/modal-slice';
import { useAppDispatch } from '@/shared/api/pretyped-redux-hooks';
import { useAppSelector } from '@/shared/api/store';
import { blobToBase64, getPhotoValidationSchema } from '@/shared/helpers';
import { useTranslation } from '@/shared/hooks';
import { Modal } from '@/shared/ui';

import s from './modal-create-publication.module.scss';

const PHOTO_MAX_SIZE = 20_971_520; // 20 Megabytes

export enum PostStatus {
  Init,
  Cropping,
  Filter,
  Publication,
}

export const ModalCreatePublication = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const open: boolean = useAppSelector(selectCreatePostModalOpen);
  const items = useAppSelector(selectCreatePostModalItems);
  const description = useAppSelector(selectCreatePostModalDescription);

  const { descriptionCloseModal, labelCloseModal } = t.post.createPostCard;
  const tCommon = t.common.createPostModal.addPhotoCard;

  const closeAndResetCreatePostModal = () => {
    dispatch(closeModal());
    setPostStatus(PostStatus.Init);
    setError(null);
    // open save draft modal
  };

  // TODO: consider moving the status to the redux store to allow manual reopening of the modal in a certain state.
  const [postStatus, setPostStatus] = useState<PostStatus>(PostStatus.Init);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const photoValidationSchema = useMemo(
    () =>
      getPhotoValidationSchema(
        {
          allowedFormats: ['image/jpeg', 'image/png'] as const,
          maxSize: PHOTO_MAX_SIZE,
        },
        {
          tooBig: () => tCommon.errors.tooBig,
          wrongFormat: () => tCommon.errors.wrongFormat,
        }
      ),
    [tCommon]
  );

  const handleCropComplete: PGWithCropCropCompleteHandler = (cropArea, cropAreaPixels, index) => {
    dispatch(setItemCropParams({ cropArea, cropAreaPixels, index }));
  };

  const confirmPublicationPost = () => {
    console.log('Publication', { description });
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
          error={error}
          onClose={closeAndResetCreatePostModal}
          onFileInputChange={async e => {
            const file = e.target.files?.[0];

            if (file) {
              const result = photoValidationSchema.safeParse(file);

              if (result.success) {
              const src = await blobToBase64(file);

              dispatch(addItem({ filter: 'normal', src }));
              setPostStatus(PostStatus.Cropping);
                setError(null);
              } else {
                setError(result.error.issues[0].message);
              }
            }
          }}
          primaryButtonTitle={t.editProfile.createPublication.primaryButtonTitle}
          title={t.editProfile.createPublication.title}
        />
      </div>
    ),
    [PostStatus.Publication]: () => (
      <div className={s.descriptionPhotoCardWrapper}>
        <CreatePostCard
          description={description}
          items={items}
          onBlur={({ description }) => dispatch(setDescription(description))}
          onPrevClick={() => setPostStatus(PostStatus.Filter)}
          onPublishPost={confirmPublicationPost}
          publishButtonLabel={t.post.createPostCard.postDescription.titleBtnSubmit}
          title={t.post.createPostCard.labelCard}
          userName={'UserName'}
        />
      </div>
    ),
  };

  return (
    <Modal
      onOpenChange={open => {
        if (!open) {
          closeModalHandler();
          setPostStatus(PostStatus.Init);
        }
      }}
      open={open}
    >
      {steps[postStatus]()}
      {/* <ConfirmModal
        headerTitle={labelCloseModal}
        onCancel={() => setOpenConfirmModal(false)}
        onConfirm={closeModalHandler}
        open={openConfirmModal}
      >
        <Typography.Regular16 className={s.confirmModal}>
          {descriptionCloseModal}
        </Typography.Regular16>
      </ConfirmModal> */}
    </Modal>
  );
};
