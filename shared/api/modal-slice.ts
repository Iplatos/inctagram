import { PGWithCropAspectRatio, PGWithCropCropArea } from '@/entities/photo-gallery-with-crop';
import { adjustArrayIndexByBoundaries } from '@/shared/helpers';
import { CCGramFilterOrString } from '@/shared/hooks';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum CreatePostStatus {
  Init,
  Cropping,
  Filter,
  Publication,
}

// TODO: consider a source of truth for this type. Maybe choose PhotoGalleryItem or something like that
export type CreatePostModalItem = {
  aspectRatio?: PGWithCropAspectRatio;
  cropArea?: PGWithCropCropArea;
  cropAreaPixels?: PGWithCropCropArea;
  filter: CCGramFilterOrString;
  src: string;
  zoom?: number;
};

type InitialState = {
  description?: string;
  error: null | string;
  items: CreatePostModalItem[];
  open: boolean;
  postStatus: CreatePostStatus;
};

const initialState: InitialState = {
  description: '',
  error: null,
  items: [],
  open: false,
  postStatus: CreatePostStatus.Init,
};

const postCreationStatusPipeline: CreatePostStatus[] = [
  CreatePostStatus.Init,
  CreatePostStatus.Cropping,
  CreatePostStatus.Filter,
  CreatePostStatus.Publication,
];

export const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    addItem: (state, action: PayloadAction<CreatePostModalItem>) => {
      state.items.push(action.payload);
      state.error = null;
    },
    closeModal: () => {
      return initialState;
    },
    moveToNextStep: state => {
      const currentStep = postCreationStatusPipeline.findIndex(el => el === state.postStatus);

      if (currentStep !== -1) {
        state.postStatus = adjustArrayIndexByBoundaries(
          postCreationStatusPipeline.length,
          currentStep + 1
        );
      }
    },
    moveToPreviousStep: state => {
      const currentStep = postCreationStatusPipeline.findIndex(el => el === state.postStatus);

      if (currentStep !== -1) {
        state.postStatus = adjustArrayIndexByBoundaries(
          postCreationStatusPipeline.length,
          currentStep - 1
        );
      }
    },
    openModal: state => {
      state.open = true;
    },
    removeItem: (state, { payload: index }: PayloadAction<number>) => {
      state.items.splice(index, 1);
    },
    setDescription: (state, { payload }: PayloadAction<string>) => {
      state.description = payload;
    },
    setError: (state, { payload }: PayloadAction<null | string>) => {
      state.error = payload;
    },
    setItemCropParams: (
      state,
      action: PayloadAction<Partial<Omit<CreatePostModalItem, 'src'>> & { index: number }>
    ) => {
      const { index, ...cropParams } = action.payload;
      const item = state.items[index];

      if (item) {
        state.items[index] = { ...item, ...cropParams };
      }
    },
  },
});

export default modalSlice.reducer;

export const {
  addItem,
  closeModal,
  moveToNextStep,
  moveToPreviousStep,
  openModal,
  removeItem,
  setDescription,
  setError,
  setItemCropParams,
} = modalSlice.actions;
