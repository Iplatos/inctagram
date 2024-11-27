import { ElementRef, useEffect, useRef, useState } from 'react';

import { FilterPhotoCardItem } from '@/entities/filter-photo-card';
import { getPhotoGalleryMockImages } from '@/features/photo-gallery/photo-gallery.stories';
import { dataURLToBlob } from '@/shared/helpers';
import { CCGramImageParsers } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Meta, StoryObj } from '@storybook/react';

import { FilterPhotoCard, FilterPhotoCardProps } from './filter-photo-card';
import { FilterPhotoCardRefObject } from './use-filter-photo-card-handle';

type CustomRenderProps = FilterPhotoCardProps & {
  imagesCount: number;
  parserFunction: keyof CCGramImageParsers;
  startIndex?: number;
};

const getImagesArray = (count: number) =>
  getPhotoGalleryMockImages(count).map<FilterPhotoCardItem>(item => ({
    filter: 'normal',
    src: item.original,
  }));

const CustomRender = ({
  imagesCount,
  items: additionalImages,
  onFilterChange,
  parserFunction,
  startIndex,
  ...props
}: CustomRenderProps) => {
  const [images, setImages] = useState(getImagesArray(imagesCount));

  const previewItemsRef = useRef<Map<FilterPhotoCardItem, ElementRef<'img'>>>(new Map());
  const galleryRef = useRef<FilterPhotoCardRefObject>(null);

  // Hack to achieve behavior similar to the usual use of `useRef`
  // (Storybook 7.6 can't pass refs because it clones components somehow)
  // Do not pass `previewItemsRef` to the `PhotoGallery` component, because the ref-callbacks inside it will not be called anyway in Storybook
  useEffect(() => {
    images.forEach((_, i) => {
      const node = document.querySelector(
        `[data-test-id='preview-filtered-image-${i}']`
      ) as HTMLImageElement;

      previewItemsRef.current?.set(images[i], node);
    });
  }, [images]);

  const handleFilterChange = (filter: string, selectedIndex: number) => {
    if (!galleryRef.current) {
      return;
    }

    const selectedImageIndex = galleryRef.current.getCurrentIndex();

    setImages(images =>
      images.map((image, index) => (index === selectedImageIndex ? { ...image, filter } : image))
    );
    onFilterChange?.(filter, selectedIndex);
  };

  const navigateToParsedImage = async () => {
    if (!galleryRef.current) {
      return;
    }
    const index = galleryRef.current.getCurrentIndex();

    if (index !== -1) {
      const imageElement = previewItemsRef.current.get?.(images[index]);

      if (!imageElement) {
        return;
      }
      const parsedImage = await galleryRef.current?.[parserFunction](imageElement);

      if (!parsedImage) {
        return;
      }
      const blob = typeof parsedImage === 'string' ? dataURLToBlob(parsedImage) : parsedImage;

      // `ObjectURL` is required to open the parsed image in a new tab, as the base64 string is blocked by chrome as a potential security threat
      window.open(URL.createObjectURL(blob), '_blank');
    }
  };

  return (
    <>
      <Button onClick={navigateToParsedImage} style={{ marginBottom: '1rem' }}>
        Open parsed image
      </Button>

      <div style={{ height: 'calc(100vh - 5.3rem)' }}>
        <FilterPhotoCard
          galleryProps={{ startIndex }}
          galleryRef={galleryRef}
          items={images.concat(additionalImages)}
          onFilterChange={handleFilterChange}
          {...props}
        />
      </div>
    </>
  );
};

const meta = {
  argTypes: {
    onFilterChange: { control: 'action' },
    onNextClick: { control: 'action' },
    onPrevClick: { control: 'action' },
    parserFunction: {
      control: 'inline-radio',
      options: ['getBlob', 'getDataURL'] satisfies (keyof CCGramImageParsers)[],
    },
    startIndex: { control: 'number' },
  },
  render: props => <CustomRender key={props.imagesCount} {...props} />,
  tags: ['autodocs'],
  title: 'FEATURES/FilterPhotoCard',
} satisfies Meta<CustomRenderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { imagesCount: 5, items: [], parserFunction: 'getBlob', title: 'Filters' },
};
