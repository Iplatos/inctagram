import { ReactImageGalleryItem } from 'react-image-gallery';

import EmailConfirmedImage from '@/assets/img/email-confirmed-image.svg?url';
import LinkExpiredImage from '@/assets/img/link-expired-image.svg?url';
import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { PhotoGalleryItem } from '@/entities/photo-gallery';
import { PhotoAspectRatio } from '@/shared/constants';
import { Meta, StoryObj } from '@storybook/react';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import { PhotoGallery, PhotoGalleryProps } from './photo-gallery';

export const getPhotoGalleryMockImages = (count: number) => {
  const DEFAULT_IMAGES = [MockUserAvatar, LinkExpiredImage, EmailConfirmedImage];

  return new Array(count).fill(0).map<ReactImageGalleryItem>((_, i) => ({
    original: DEFAULT_IMAGES[i % DEFAULT_IMAGES.length].src,
  }));
};

export const getPhotoGalleryMockImagesWithAR = (count: number) => {
  const items = getPhotoGalleryMockImages(count);
  const ASPECT_RATIOS: PhotoAspectRatio[] = ['4 / 5', '16 / 9', '4 / 3', '1 / 1'];

  return items.map<PhotoGalleryItem>((item, i) => ({
    aspectRatio: ASPECT_RATIOS[i % ASPECT_RATIOS.length],
    ...item,
  }));
};

type CustomRenderProps = {
  aspectRatio: 'none' | PhotoAspectRatio;
  imagesCount: number;
} & Omit<PhotoGalleryProps, 'aspectRatio'>;

const CustomRender = ({ aspectRatio, imagesCount, items, ...props }: CustomRenderProps) => {
  return (
    <PhotoGallery
      aspectRatio={aspectRatio === 'none' ? undefined : aspectRatio}
      items={getPhotoGalleryMockImages(imagesCount).concat(items)}
      {...props}
    />
  );
};

const meta = {
  argTypes: {
    aspectRatio: {
      control: 'radio',
      options: [
        '4 / 5',
        '4 / 3',
        '16 / 9',
        '1 / 1',
        'none',
      ] satisfies CustomRenderProps['aspectRatio'][],
    },
    imagesCount: {
      control: { type: 'number' },
    },
  },
  decorators: [
    Story => (
      // TODO:  add an explicit height clarification for all `PhotoGallery` related stories and components based on it
      <div style={{ height: 'calc(-2rem + 100vh)' }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: ['getPhotoGalleryMockImages', 'getPhotoGalleryMockImagesWithAR'],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'FEATURES/PhotoGallery',
} satisfies Meta<CustomRenderProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StretchImage: Story = {
  args: {
    aspectRatio: 'none',
    imagesCount: 5,
    items: [],
  },
};

export const WithAspectRatio: Story = {
  args: {
    ...StretchImage.args,
    aspectRatio: '4 / 5',
  },
};

export const CustomAspectRatios: Story = {
  args: {
    ...StretchImage.args,
    imagesCount: 0,
    items: getPhotoGalleryMockImagesWithAR(5),
  },
};
