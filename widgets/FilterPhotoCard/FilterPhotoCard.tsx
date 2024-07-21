import { ElementRef, ForwardedRef, useMemo } from 'react';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import { capitalise } from '@/shared/helpers';
import { Button, Card, IconButton, Typography } from '@/shared/ui';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import s from './FilterPhotoCard.module.scss';

import {
  CCGramFilter,
  CCGramFilterOrString,
  CCGramImageParsers,
  useCCGramFilter,
} from './useFilter';

export type FilterPhotoCardNavHandler = (
  params: { parsers: CCGramImageParsers } & { selectedFilter: string }
) => void;

export type FilterPhotoCardProps = {
  initialFilter?: CCGramFilter;
  onFilterChange?: (filter: CCGramFilterOrString, imageIndex: number) => void;
  onNextClick?: FilterPhotoCardNavHandler;
  onPrevClick?: FilterPhotoCardNavHandler;
  previewRef?: ForwardedRef<ElementRef<'img'>>;
  src: (StaticImport | string)[];
};

export const FilterPhotoCard = ({
  initialFilter = 'normal',
  onFilterChange,
  onNextClick,
  onPrevClick,
  previewRef,
  src,
}: FilterPhotoCardProps) => {
  const { applyFilter, filterNames, getBlob, getDataURL, registerImage, selectedFilter } =
    useCCGramFilter({ initialFilter });

  const sortedFilterNames = useMemo(() => {
    return ['normal', ...filterNames.sort((a, b) => a.localeCompare(b))];
  }, [filterNames]);

  const handleFilterChange = (filter: CCGramFilterOrString, imageIndex: number) => {
    onFilterChange?.(filter, imageIndex);
    applyFilter(filter);
  };

  // This is a temporary solution until the image gallery is built into this component
  const firstImageSrc = src[0];
  const firstImageIndex = 0;

  const handlePrevBtnClick = () => {
    onPrevClick?.({ parsers: { getBlob, getDataURL }, selectedFilter });
  };

  const handleNextBtnClick = () => {
    onNextClick?.({ parsers: { getBlob, getDataURL }, selectedFilter });
  };

  return (
    <Card className={s.cardRoot}>
      <Card.Header className={s.header}>
        <IconButton onClick={handlePrevBtnClick}>
          <ArrowIOSBack />
        </IconButton>
        <Typography.H1 className={s.headerTitle} component={'h2'}>
          Filters
        </Typography.H1>
        <Button onClick={handleNextBtnClick} variant={'text'}>
          Next
        </Button>
      </Card.Header>

      <div className={s.contentWrapper}>
        <div className={s.previewWrapper}>
          <Image
            alt={'preview a photo with the selected filter'}
            data-test-id={'preview-filtered-image'}
            {...registerImage()}
            fill
            priority
            ref={previewRef}
            src={firstImageSrc}
          />
        </div>

        <Card.Content className={s.filtersList}>
          {sortedFilterNames.map((filter, i) => (
            <div className={s.filterItem} key={filter}>
              <div className={s.filterImageWrapper}>
                <Image
                  alt={`preview of the ${filter} photo filter`}
                  {...registerImage(filter)}
                  fill
                  onClick={() => handleFilterChange(filter, firstImageIndex)}
                  src={firstImageSrc}
                />
              </div>
              <Typography.Regular16 className={s.filterTitle}>
                {capitalise(filter, true)}
              </Typography.Regular16>
            </div>
          ))}
        </Card.Content>
      </div>
    </Card>
  );
};
