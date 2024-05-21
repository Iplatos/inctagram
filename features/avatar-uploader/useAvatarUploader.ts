import type { CropProps } from '@/shared/ui/croppedImage';
import type { CroppedRect, Position } from 'react-avatar-editor';

import { useReducer } from 'react';

import { getDefaultCropProps } from '@/shared/helpers/getDefaultCropProps';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const PHOTO_MAX_SIZE = 10_485_760; // 10 Megabytes

type InitialState = {
  editorPosition: Position;
  error: null | string;
  errorsList: Record<string, string>;
  preview?: File;
  scale: number;
};

const dCP = getDefaultCropProps();

const initialState: InitialState = {
  editorPosition: { x: 0.5, y: 0.5 },
  error: null,
  errorsList: {},
  scale: dCP.scale,
};

/**
 * The `initialScale` should be passed to the hook to correctly calculate editor's cropping parameters
 * when the image is loaded on the `onImageReady` event.
 */
export const useAvatarUploader = (initialScale?: number) => {
  const { avatarUploader: t } = useTranslation().t.common;
  const [state, dispatch] = useReducer(slice.reducer, {
    ...initialState,
    errorsList: t.errors,
    scale: initialScale ?? dCP.scale,
  });

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
    editorPositionInitialized(state, { payload }: PayloadAction<CroppedRect & Partial<CropProps>>) {
      const { height, offsetX, offsetY, scale, width } = payload;

      // When loading a preview from the device, existing cropping props will be reset to default values
      const initialOffsetX = state.preview || offsetX === undefined ? dCP.offsetX : offsetX;
      const initialOffsetY = state.preview || offsetY === undefined ? dCP.offsetY : offsetY;
      const initialScale = state.preview || scale === undefined ? dCP.scale : scale;

      state.scale = initialScale;
      state.editorPosition.x = getCanvasPositionFromOffset(width, initialOffsetX);
      state.editorPosition.y = getCanvasPositionFromOffset(height, initialOffsetY);
    },
    loadedFromDevice(state, { payload }: PayloadAction<File>) {
      if (!['image/jpeg', 'image/png'].includes(payload.type)) {
        state.error = state.errorsList.wrongFormat;

        return;
      }
      if (payload.size > PHOTO_MAX_SIZE) {
        state.error = state.errorsList.tooBig;

        return;
      }

      if (state.error) {
        state.error = null;
      }

      state.preview = payload;
      state.editorPosition = initialState.editorPosition;
      state.scale = dCP.scale;
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
