import { useReducer } from 'react';
import { CroppedRect, Position } from 'react-avatar-editor';

import { CropProps } from '@/shared/ui/croppedImage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// TODO: set max photo size to 10 Mb
const PHOTO_MAX_SIZE = 10_485_760; // 10 Megabytes
// const PHOTO_MAX_SIZE = 204_800; // 200 kilobytes

type InitialState = {
  canvasPosition: Position;
  cropProps: CropProps;
  error: null | string;
  preview?: File;
};

export const useAvatarUploader = () => {
  return useReducer(slice.reducer, initialState);
};

const defaultCropProps = { offsetX: 0.5, offsetY: 0.5, scale: 1 };
const defaultPosition = { x: 0.5, y: 0.5 };
const initialState: InitialState = {
  canvasPosition: defaultPosition,
  cropProps: defaultCropProps,
  error: null,
};

const slice = createSlice({
  initialState,
  name: 'avatarUploader',
  reducers: {
    canvasInitialized(state, action: PayloadAction<CroppedRect & Omit<CropProps, 'scale'>>) {
      const { height, offsetX, offsetY, width } = action.payload;

      state.canvasPosition.x = getCanvasPosition(width, offsetX);
      state.canvasPosition.y = getCanvasPosition(height, offsetY);
    },
    canvasPositionChanged(state, { payload: pos }: PayloadAction<Position>) {
      state.canvasPosition.x = pos.x;
      state.canvasPosition.y = pos.y;
    },
    modalClosed(state) {
      state.preview = undefined;
      state.error = null;
    },
    previewAdded(state, { payload: preview }: PayloadAction<File>) {
      if (!['image/jpeg', 'image/png'].includes(preview.type)) {
        state.error = '<bold>Error!</bold> The format of the uploaded photo must be PNG or JPEG';

        return;
      }
      if (preview.size > PHOTO_MAX_SIZE) {
        state.error = '<bold>Error!</bold> Photo size must be less than 10 MB!';

        return;
      }

      if (state.error) {
        state.error = null;
      }

      state.preview = preview;
      state.canvasPosition.x = initialState.canvasPosition.x;
      state.canvasPosition.y = initialState.canvasPosition.y;
      state.cropProps.scale = initialState.cropProps.scale;
    },
    scaleChanged(state, { payload: offset }: PayloadAction<number>) {
      const prev = state.cropProps.scale;
      const scale = Math.min(2, Math.max(1, prev + offset));

      state.cropProps.scale = +scale.toFixed(2);
    },
  },
});

export const { canvasInitialized, canvasPositionChanged, modalClosed, previewAdded, scaleChanged } =
  slice.actions;

export const castCroppedSizeToOffsetProp = (circleSize: number, circlePos: number) => {
  if (circleSize === 1) {
    return 0.5;
  }
  const offset = circlePos / (1 - circleSize);

  return Math.round(offset * 100) / 100;
};

export const getCanvasPosition = (circleSize: number, offset: number) => {
  if (circleSize === 1) {
    return 0.5;
  }
  const radius = circleSize / 2;

  return (1 - circleSize) * offset + radius;
};
