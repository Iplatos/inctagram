import { ReactImageGalleryItem } from 'react-image-gallery';

import EmailConfirmedImage from '@/assets/img/email-confirmed-image.svg?url';
import LinkExpiredImage from '@/assets/img/link-expired-image.svg?url';
import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { Meta, StoryObj } from '@storybook/react';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import { PhotoGallery, PhotoGalleryProps } from './photo-gallery';

export const getPhotoGalleryMockImages = (count: number) => {
  const DEFAULT_IMAGES = [MockUserAvatar, LinkExpiredImage, EmailConfirmedImage];

  return new Array(count).fill(0).map<ReactImageGalleryItem>((_, i) => ({
    original: DEFAULT_IMAGES[i % DEFAULT_IMAGES.length].src,
  }));
};

type CustomRenderProps = {
  imagesCount: number;
} & PhotoGalleryProps;

const CustomRender = ({ imagesCount, items, ...props }: CustomRenderProps) => {
  return <PhotoGallery {...props} items={getPhotoGalleryMockImages(imagesCount).concat(items)} />;
};

const meta = {
  argTypes: {
    imagesCount: {
      control: { type: 'number' },
    },
  },
  excludeStories: ['getPhotoGalleryMockImages'],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'FEATURES/PhotoGallery',
} satisfies Meta<CustomRenderProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    imagesCount: 5,
    items: [],
  },
};
