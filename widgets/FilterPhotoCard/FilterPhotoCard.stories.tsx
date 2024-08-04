import { ElementRef, useEffect, useRef, useState } from 'react';

import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { blobToBase64, dataURLToBlob } from '@/shared/helpers';
import {
  CCGramFilter,
  CCGramFilterOrString,
  CCGramImageParsers,
  useCCGramFilter,
} from '@/shared/hooks';
import { Replace } from '@/shared/types/helpers';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/typography';
import { Meta, StoryObj } from '@storybook/react';
import { DEFAULT_FILTERS } from 'cc-gram';

import { FilterPhotoCard, FilterPhotoCardProps } from './FilterPhotoCard';

type CustomRenderProps = Replace<
  FilterPhotoCardProps,
  {
    initialFilter: CCGramFilter;
    parserFunction: keyof CCGramImageParsers;
  }
>;

const CustomRender = ({ onFilterChange, parserFunction, ...props }: CustomRenderProps) => {
  const [filter, setFilter] = useState<CCGramFilterOrString>(props.initialFilter);
  const [imageUrl, setImageUrl] = useState('');

  const imageRef = useRef<ElementRef<'img'>>();

  // Hack to achieve behavior similar to the usual use of `useRef`
  //  (Storybook 7.6 can't pass refs because it clones components somehow)
  useEffect(() => {
    if (!imageRef.current) {
      imageRef.current = document.querySelector(
        '[data-test-id="preview-filtered-image"]'
      ) as HTMLImageElement;
    }
  }, []);

  const { getBlob, getDataURL } = useCCGramFilter();

  useEffect(() => {
    getImageUrl().then(url => {
      if (url) {
        setImageUrl(url);
      }
    });

    async function getImageUrl() {
      if (!imageRef.current) {
        return;
      }

      if (parserFunction === 'getBlob') {
        const blob = await getBlob(imageRef.current);

        if (blob) {
          return blobToBase64(blob);
        }
      }

      return getDataURL(imageRef.current);
    }
  }, [filter, parserFunction, getBlob, getDataURL]);

  const handleFilterChange: FilterPhotoCardProps['onFilterChange'] = (filter, imageIndex) => {
    setFilter(filter);
    onFilterChange?.(filter, imageIndex);
  };

  const navigateToParsedImage = () => {
    // `ObjectURL` is required to open the parsed image in a new tab, as the base64 string is blocked by chrome as a potential security threat
    const blob = dataURLToBlob(imageUrl);

    window.open(URL.createObjectURL(blob), '_blank');
  };

  return (
    <>
      <div className={'controls-wrapper'}>
        <Button disabled={!imageUrl} onClick={navigateToParsedImage}>
          Open parsed image
        </Button>
        {!imageUrl && (
          <Typography.Regular16>
            Select the filter manually to enable the navigation button
          </Typography.Regular16>
        )}
      </div>

      <div style={{ height: 'calc(100vh - 5.3rem)' }}>
        <FilterPhotoCard onFilterChange={handleFilterChange} {...props} />
      </div>
    </>
  );
};

const filterOptions = [
  'normal',
  ...Array.from(DEFAULT_FILTERS.keys()).sort((a, b) => a.localeCompare(b)),
] satisfies CCGramFilterOrString[];

const meta = {
  argTypes: {
    initialFilter: { control: 'select', options: filterOptions },
    onFilterChange: { control: 'action' },
    onNextClick: { control: 'action' },
    onPrevClick: { control: 'action' },
    parserFunction: {
      control: 'inline-radio',
      options: ['getBlob', 'getDataURL'] satisfies (keyof CCGramImageParsers)[],
    },
  },
  decorators: [
    Story => (
      // TODO: add a description of the various possible height settings to achieve adjustable card height and automatic scrolling on overflow
      <>
        <style>{`
          .controls-wrapper { margin-bottom: 1rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }
        `}</style>
        <Story />
      </>
    ),
  ],
  render: args => <CustomRender key={args.initialFilter} {...args} />,
  tags: ['autodocs'],
  title: 'WIDGETS/FilterPhotoCard',
} satisfies Meta<CustomRenderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { initialFilter: 'inkwell', parserFunction: 'getBlob', src: [MockUserAvatar.src] },
};
