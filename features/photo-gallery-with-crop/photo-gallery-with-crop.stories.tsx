import type { Meta, StoryObj } from '@storybook/react';

import { Fragment, useState } from 'react';

import { PGWithCropAspectRatio } from '@/entities/photo-gallery-with-crop';
import { getPhotoGalleryMockImages } from '@/features/photo-gallery/photo-gallery.stories';

import {
  PGWithCropAspectRatioHandler,
  PGWithCropCropCompleteHandler,
  PGWithCropItem,
  PGWithCropZoomHandler,
  PhotoGalleryWithCrop,
  PhotoGalleryWithCropProps,
} from './photo-gallery-with-crop';

export const getPGWithCropMockItems = (count: number) => {
  const aspectRatios: PGWithCropAspectRatio[] = ['original', '1 / 1', '4 / 5', '16 / 9'];

  return getPhotoGalleryMockImages(count).map<PGWithCropItem>((item, i) => ({
    ...item,
    cropperProps: { aspectRatio: aspectRatios[i % aspectRatios.length] },
  }));
};

type CustomRenderProps = Partial<PhotoGalleryWithCropProps> & { imagesCount: number };

const CustomRender = ({
  imagesCount,
  items: initialItems = [],
  onAspectRatioChange,
  onCropComplete,
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
    <PhotoGalleryWithCrop
      items={items}
      key={imagesCount}
      onAspectRatioChange={handleAspectRatioChange}
      onCropComplete={handleCropComplete}
      onZoomChange={handleZoomChange}
      {...props}
    />
  );
};

const meta = {
  argTypes: {
    onAspectRatioChange: { control: 'action' },
    onCropComplete: { control: 'action' },
    onItemAdd: { control: 'action' },
    onItemRemove: { control: 'action' },
    onZoomChange: { control: 'action' },
  },
  decorators: [
    (Story, { args }) => (
      // reset story if the `imagesCount` prop has been changed
      <div style={{ height: 'calc(-2rem + 100vh)' }}>
        <Fragment key={args.imagesCount}>
          <Story />
        </Fragment>
      </div>
    ),
  ],
  excludeStories: ['getPGWithCropMockItems'],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'FEATURES/PhotoGalleryWithCrop',
} satisfies Meta<CustomRenderProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { imagesCount: 5, items: [], showCropperControls: true },
};
