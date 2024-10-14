import { useState } from 'react';

import {
  PGWithCropAspectRatioHandler,
  PGWithCropCropCompleteHandler,
  PGWithCropZoomHandler,
} from '@/features/photo-gallery-with-crop';
import { getPGWithCropMockItems } from '@/features/photo-gallery-with-crop/photo-gallery-with-crop.stories';
import * as PGWithCropStories from '@/features/photo-gallery-with-crop/photo-gallery-with-crop.stories';
import { Meta, StoryObj } from '@storybook/react';

import { CropPhotoCard, CropPhotoCardProps } from './crop-photo-card';

// Hack to extract event handlers from the `galleryProps` object,
//  since the Storybook cannot pass action callbacks to nested objects passed as props.
type PGWithCropHandler = keyof typeof PGWithCropStories.default.argTypes;
type PGWithCropHandlersMap = {
  [K in PGWithCropHandler]: (...args: any[]) => any;
};
type CustomRenderProps = CropPhotoCardProps & { imagesCount: number } & PGWithCropHandlersMap;

const CustomRender = ({
  galleryProps: { items: initialItems = [], ...restGalleryProps },
  imagesCount,
  onAspectRatioChange,
  onCropComplete,
  onItemAdd,
  onItemRemove,
  onZoomChange,
  ...props
}: CustomRenderProps) => {
  const [items, setItems] = useState(() =>
    getPGWithCropMockItems(imagesCount).concat(initialItems)
  );

  const handleCropComplete: PGWithCropCropCompleteHandler = (
    cropArea,
    cropAreaPixels,
    currentIndex
  ) => {
    onCropComplete?.(cropArea, cropAreaPixels, currentIndex);
    setItems(items =>
      items.map((item, i) =>
        i === currentIndex
          ? {
              ...item,
              cropperProps: { ...item.cropperProps, initialCroppedAreaPixels: cropAreaPixels },
            }
          : item
      )
    );
  };

  const handleZoomChange: PGWithCropZoomHandler = (zoom, currentIndex) => {
    onZoomChange?.(zoom, currentIndex);
    setItems(items =>
      items.map((item, i) =>
        i === currentIndex ? { ...item, cropperProps: { ...item.cropperProps, zoom } } : item
      )
    );
  };

  const handleAspectRatioChange: PGWithCropAspectRatioHandler = (aspectRatio, currentIndex) => {
    onAspectRatioChange?.(aspectRatio, currentIndex);
    setItems(items =>
      items.map((item, i) =>
        i === currentIndex ? { ...item, cropperProps: { ...item.cropperProps, aspectRatio } } : item
      )
    );
  };

  return (
    <CropPhotoCard
      galleryProps={{
        ...restGalleryProps,
        items,
        onAspectRatioChange: handleAspectRatioChange,
        onCropComplete: handleCropComplete,
        onItemAdd,
        onItemRemove,
        onZoomChange: handleZoomChange,
      }}
      {...props}
    />
  );
};

const meta = {
  argTypes: {
    onNextClick: { control: 'action' },
    onPrevClick: { control: 'action' },
    ...PGWithCropStories.default.argTypes,
  },
  decorators: [
    Story => (
      <div style={{ height: 'calc(100vh - 2rem)', width: 'min(490px, 100%)' }}>
        <Story />
      </div>
    ),
  ],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'FEATURES/CropPhotoCard',
} satisfies Meta<CustomRenderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    disabled: false,
    galleryProps: { items: [] },
    imagesCount: 5,
    title: 'Cropping',
  },
};
