import { ChangeEvent } from 'react';

import {
  PGWithCropAspectRatioHandler,
  PGWithCropCropCompleteHandler,
  PGWithCropZoomHandler,
} from '@/features/photo-gallery-with-crop';
import {
  addItem,
  closeModal,
  moveToNextStep,
  moveToPreviousStep,
  removeItem,
  setDescription,
  setError,
  setItemCropParams,
} from '@/shared/api/modal-slice';
import { useAppDispatch, useAppSelector } from '@/shared/api/pretyped-redux-hooks';
import { blobToBase64, getPhotoValidationSchema } from '@/shared/helpers';

const PHOTO_MAX_SIZE = 20_971_520; // 20 Megabytes

type ValidationErrorsMap = NonNullable<Parameters<typeof getPhotoValidationSchema>[1]>;

export const useCreatePostModalHandle = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.modal);

  const onAspectRatioChange: PGWithCropAspectRatioHandler = (aspectRatio, index) =>
    dispatch(setItemCropParams({ aspectRatio, index }));

  const onCropAreaChange: PGWithCropCropCompleteHandler = (cropArea, cropAreaPixels, index) => {
    dispatch(setItemCropParams({ cropArea, cropAreaPixels, index }));
  };

  const onItemAdd = (src: string): true => {
    dispatch(addItem({ filter: 'normal', src }));

    return true;
  };

  const onItemRemove = (index: number): true => {
    dispatch(removeItem(index));

    return true;
  };

  const onZoomChange: PGWithCropZoomHandler = (zoom, index) =>
    dispatch(setItemCropParams({ index, zoom }));

  const onFilterChange = (filter: string, index: number) =>
    dispatch(setItemCropParams({ filter, index }));

  const onFileInputChange =
    (errorsMap?: ValidationErrorsMap) => async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) {
        return;
      }

      const photoValidationSchema = getPhotoValidationSchema(
        { allowedFormats: ['image/jpeg', 'image/png'] as const, maxSize: PHOTO_MAX_SIZE },
        errorsMap
      );
      const result = photoValidationSchema.safeParse(file);

      if (result.success) {
        // TODO: consider using DataURL link instead of base64
        const src = await blobToBase64(file);

        dispatch(addItem({ filter: 'normal', src }));
        dispatch(moveToNextStep());
      } else {
        dispatch(setError(result.error.issues[0].message));
      }
    };

  const handlers = {
    closeModal: () => dispatch(closeModal()),
    moveToNextStep: () => dispatch(moveToNextStep()),
    moveToPreviousStep: () => dispatch(moveToPreviousStep()),
    onAspectRatioChange,
    onCropAreaChange,
    onFileInputChange,
    onFilterChange,
    onItemAdd,
    onItemRemove,
    onZoomChange,
    setDescription: (description: string) => dispatch(setDescription(description)),
  };

  return { handlers, state };
};
