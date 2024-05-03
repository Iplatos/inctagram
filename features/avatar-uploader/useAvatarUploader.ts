import type { CropProps } from '@/shared/ui/croppedImage';
import type { CroppedRect, Position } from 'react-avatar-editor';

import { useReducer } from 'react';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const PHOTO_MAX_SIZE = 10_485_760; // 10 Megabytes

type InitialState = {
  editorPosition: Position;
  error: null | string;
  preview?: File;
  scale: number;
};

const defaultCropProps: CropProps = { offsetX: 0.5, offsetY: 0.5, scale: 1 };
const defaultPosition: Position = { x: 0.5, y: 0.5 };
const initialState: InitialState = {
  editorPosition: defaultPosition,
  error: null,
  scale: 1,
};

export const useAvatarUploader = () => {
  const [state, dispatch] = useReducer(slice.reducer, initialState);

  return { actions: slice.actions, dispatch, state };
};

const slice = createSlice({
  initialState,
  name: 'avatarUploader',
  reducers: {
    editorClosed(state) {
      state.preview = undefined;
      state.error = null;
    },
    editorPositionChanged(state, { payload: pos }: PayloadAction<Position>) {
      state.editorPosition.x = pos.x;
      state.editorPosition.y = pos.y;
    },
    editorPositionInitialized(
      state,
      { payload }: PayloadAction<CroppedRect & Omit<Partial<CropProps>, 'scale'>>
    ) {
      const { height, offsetX, offsetY, width } = payload;
      let initialOffsetX = state.preview ? defaultCropProps.offsetX : offsetX;
      let initialOffsetY = state.preview ? defaultCropProps.offsetY : offsetY;

      initialOffsetX ??= defaultCropProps.offsetX;
      initialOffsetY ??= defaultCropProps.offsetY;
      state.editorPosition.x = getCanvasPositionFromOffset(width, initialOffsetX);
      state.editorPosition.y = getCanvasPositionFromOffset(height, initialOffsetY);
    },
    loadedFromDevice(state, { payload }: PayloadAction<File>) {
      if (!['image/jpeg', 'image/png'].includes(payload.type)) {
        state.error = '<bold>Error!</bold> The format of the uploaded photo must be PNG or JPEG';

        return;
      }
      if (payload.size > PHOTO_MAX_SIZE) {
        state.error = '<bold>Error!</bold> Photo size must be less than 10 MB (MegaBytes)!';

        return;
      }

      if (state.error) {
        state.error = null;
      }

      state.preview = payload;
      state.editorPosition = defaultPosition;
      state.scale = defaultCropProps.scale;
    },
    scaleChanged(state, { payload: offset }: PayloadAction<number>) {
      const prev = state.scale;
      const scale = Math.min(2, Math.max(1, prev + offset));

      state.scale = +scale.toFixed(2);
    },
  },
});

export const {
  editorClosed,
  editorPositionChanged,
  editorPositionInitialized,
  loadedFromDevice,
  scaleChanged,
} = slice.actions;

export const getCanvasPositionFromOffset = (circleSize: number, offset: number) => {
  if (circleSize === 1) {
    return 0.5;
  }
  const radius = circleSize / 2;

  return (1 - circleSize) * offset + radius;
};
