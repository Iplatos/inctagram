import { resolveImageSrcToString } from '@/shared/helpers';
import { Meta, StoryObj } from '@storybook/react';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import MockImage from '../../assets/img/mock-user-avatar.jpg';
import { PhotoGallery, PhotoGalleryPropsType } from './photo-gallery';

type CustomRenderProps = {
  imagesCount: number;
} & PhotoGalleryPropsType;

const CustomRender = ({ imagesCount, items, ...rest }: CustomRenderProps) => {
  const imagesArray = new Array(imagesCount)
    .fill(0)
    .concat(items)
    .map(i => {
      return { original: i === 0 ? (resolveImageSrcToString(MockImage) as string) : i };
    });

  return <PhotoGallery {...rest} items={imagesArray} />;
};

const meta = {
  argTypes: {
    imagesCount: {
      control: {
        max: '10',
        min: '1',
        type: 'number',
      },
    },
  },
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
