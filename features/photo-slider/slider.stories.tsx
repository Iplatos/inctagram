import type { Meta, StoryObj } from '@storybook/react';

import { Fragment, useState } from 'react';

import { PhotoSliderRenderItemAspectRatio } from '@/entities/photo-slider';
import { getPhotoGalleryMockImages } from '@/features/photo-gallery/photo-gallery.stories';

import {
  PhotoSlider,
  PhotoSliderAspectRatioHandler,
  PhotoSliderCropCompleteHandler,
  PhotoSliderItem,
  PhotoSliderProps,
  PhotoSliderZoomHandler,
} from './slider';

export const getPhotoSliderMockItems = (count: number) => {
  const aspectRatios: PhotoSliderRenderItemAspectRatio[] = ['original', '1 / 1', '4 / 5', '16 / 9'];

  return getPhotoGalleryMockImages(count).map<PhotoSliderItem>((item, i) => ({
    ...item,
    cropperProps: { aspectRatio: aspectRatios[i % aspectRatios.length] },
  }));
};

type CustomRenderProps = Partial<PhotoSliderProps> & { imagesCount: number };

const CustomRender = ({
  imagesCount,
  items: initialItems = [],
  onAspectRatioChange,
  onCropComplete,
  onZoomChange,
  ...props
}: CustomRenderProps) => {
  const [items, setItems] = useState(() =>
    getPhotoSliderMockItems(imagesCount).concat(initialItems)
  );

  const handleCropComplete: PhotoSliderCropCompleteHandler = (
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

  const handleZoomChange: PhotoSliderZoomHandler = (zoom, currentIndex) => {
    onZoomChange?.(zoom, currentIndex);
    setItems(items =>
      items.map((item, i) =>
        i === currentIndex ? { ...item, cropperProps: { ...item.cropperProps, zoom } } : item
      )
    );
  };

  const handleAspectRatioChange: PhotoSliderAspectRatioHandler = (aspectRatio, currentIndex) => {
    onAspectRatioChange?.(aspectRatio, currentIndex);
    setItems(items =>
      items.map((item, i) =>
        i === currentIndex ? { ...item, cropperProps: { ...item.cropperProps, aspectRatio } } : item
      )
    );
  };

  return (
    <PhotoSlider
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
      <Fragment key={args.imagesCount}>
        <Story />
      </Fragment>
    ),
  ],
  excludeStories: ['getPhotoSliderMockItems'],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'FEATURES/PhotoSlider',
} satisfies Meta<CustomRenderProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { imagesCount: 5, items: [], showCropperControls: true },
};
