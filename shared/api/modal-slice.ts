import { PGWithCropAspectRatio, PGWithCropCropArea } from '@/entities/photo-gallery-with-crop';
import { CCGramFilter, CCGramFilterOrString } from '@/shared/hooks';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  items: CreatePostModalItem[];
  open: boolean;
};

const initialState: InitialState = {
  description: '',
  items: [],
  open: false,
};

export const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    addItem: (state, action: PayloadAction<CreatePostModalItem>) => {
      state.items.push(action.payload);
    },
    addItemFilter: (state, action: PayloadAction<{ filter: CCGramFilter; index: number }>) => {
      const { filter, index } = action.payload;
      const item = state.items[index];

      if (item) {
        item.filter = filter;
      }
    },
    clearItems: state => {
      state.items = [];
    },
    // TODO: maybe rename action to `resetAndClose` ?
    closeModal: (state, action: PayloadAction<boolean | void>) => {
      state.open = false;
      const shouldClearItems = action.payload ?? true;

      if (shouldClearItems) {
        state.items = [];
        state.description = '';
      }
    },
    openModal: state => {
      state.open = true;
    },
    removeItem: (state, { payload: index }: PayloadAction<number>) => {
      state.items.splice(index, 1);
    },
    resetItemFilters: state => {
      for (const item of state.items) {
        if (item.filter !== 'normal') {
          item.filter = 'normal';
        }
      }
    },
    setDescription: (state, { payload }: PayloadAction<string>) => {
      state.description = payload;
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
  selectors: {
    selectCreatePostModalDescription: state => state.description,
    selectCreatePostModalItems: state => state.items,
    selectCreatePostModalOpen: state => state.open,
  },
});

export default modalSlice.reducer;

export const {
  addItem,
  addItemFilter,
  clearItems,
  closeModal,
  openModal,
  removeItem,
  resetItemFilters,
  setDescription,
  setItemCropParams,
} = modalSlice.actions;
export const {
  selectCreatePostModalDescription,
  selectCreatePostModalItems,
  selectCreatePostModalOpen,
} = modalSlice.selectors;
