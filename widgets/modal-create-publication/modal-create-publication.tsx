import { ReactElement, useState } from 'react';
import { batch } from 'react-redux';

import {
  AddPhotoCard,
  CropPhotoCard,
  FilterPhotoCard,
  PGWithCropCropCompleteHandler,
} from '@/features';
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
import { useAppDispatch } from '@/shared/api/pretyped-redux-hooks';
import { useAppSelector } from '@/shared/api/store';
import { blobToBase64 } from '@/shared/helpers';
import { useTranslation } from '@/shared/hooks';
import { Modal } from '@/shared/ui';

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

  const open = useAppSelector(selectCreatePostModalOpen);
  const items = useAppSelector(selectCreatePostModalItems);

  const closeModalHandler = () => {
    dispatch(closeModal());
    setPostStatus(PostStatus.Init);
    //open save draft modal
  };

  // TODO: consider moving the status to the redux store to allow manual reopening of the modal in a certain state.
  const [postStatus, setPostStatus] = useState<PostStatus>(PostStatus.Init);

  const handleCropComplete: PGWithCropCropCompleteHandler = (cropArea, cropAreaPixels, index) => {
    dispatch(setItemCropParams({ cropArea, cropAreaPixels, index }));
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
    [PostStatus.Publication]: () => <div>Publication</div>,
  };

  return (
    <Modal
      onOpenChange={open => {
        if (!open) {
          closeModalHandler();
        }
      }}
      open={open}
    >
      {steps[postStatus]()}
    </Modal>
  );
};
