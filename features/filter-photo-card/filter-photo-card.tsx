import { ElementRef, ForwardedRef, MutableRefObject, useMemo, useState } from 'react';
import { ReactImageGalleryItem } from 'react-image-gallery';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import { PhotoGallery, PhotoGalleryProps } from '@/features';
import { adjustArrayIndexByBoundaries, capitalise } from '@/shared/helpers';
import { CCGramFilterOrString } from '@/shared/hooks';
import { Button, IconButton, ModalCard, Typography } from '@/shared/ui';
import Image from 'next/image';

import s from './filter-photo-card.module.scss';

import { FilterPhotoCardRefObject, useFilterPhotoCardHandle } from './use-filter-photo-card-handle';

export type FilterPhotoCardItem = { filter: CCGramFilterOrString; src: string };

export type FilterPhotoCardProps = {
  galleryProps?: Omit<PhotoGalleryProps, 'items'>;
  galleryRef?: ForwardedRef<FilterPhotoCardRefObject>;
  items: FilterPhotoCardItem[];
  onFilterChange?: (selectedFilter: string) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  previewItemsRef?: MutableRefObject<Map<FilterPhotoCardItem, ElementRef<'img'>>>;
};

export const FilterPhotoCard = ({
  galleryProps = {},
  galleryRef,
  items,
  onFilterChange,
  onNextClick,
  onPrevClick,
  previewItemsRef,
}: FilterPhotoCardProps) => {
  const { onSlide, startIndex, ...restGalleryProps } = galleryProps;

  const {
    filter: { applyFilter, filterNames, registerImage },
    innerGalleryRef,
  } = useFilterPhotoCardHandle(galleryRef);

  const [prevStartIndex, setPrevStartIndex] = useState(startIndex);
  const [selectedIndex, setSelectedIndex] = useState(
    adjustArrayIndexByBoundaries(items, startIndex)
  );

  // The `startIndex` is not used to set the current value, as is usually the case
  // with the controlled mode of the component.
  // It only sets the initializing value for the internal `ReactImageGallery` state.
  // However, this internal state is reset to the `startIndex` value on any `ReactImageGallery`
  // re-rendering, even if the rendering is not associated with a `startIndex` change.
  // Therefore, you should keep track of the current index yourself by passing it
  // to the `startIndex` prop of the `ReactImageGallery` and resetting current index
  // if the `startIndex` prop of the `FilterPhotoCard` has been changed.
  if (prevStartIndex !== startIndex) {
    setPrevStartIndex(startIndex);
    setSelectedIndex(adjustArrayIndexByBoundaries(items, startIndex));
  }

  const handleSlideChange: PhotoGalleryProps['onSlide'] = currentIndex => {
    onSlide?.(currentIndex);
    setSelectedIndex(currentIndex);
  };

  const handleFilterChange = (filter: string) => {
    onFilterChange?.(filter);
    applyFilter(filter);
  };

  const renderItems = items.map<ReactImageGalleryItem>((item, index) => ({
    original: item.src,
    renderItem: ({ original }) => (
      <PhotoGallery.PreviewImageWrapper>
        <Image
          alt={'preview a photo with the selected filter'}
          className={'image-gallery-slide-image'}
          data-test-id={`preview-filtered-image-${index}`}
          fill
          priority
          ref={node => {
            const map = previewItemsRef?.current;

            if (node) {
              map?.set(item, node);
            } else {
              map?.delete(item);
            }
          }}
          src={original}
          {...registerImage(item.filter)}
        />
      </PhotoGallery.PreviewImageWrapper>
    ),
  }));

  const sortedFilterNames = useMemo(() => {
    return ['normal', ...filterNames.sort((a, b) => a.localeCompare(b))];
  }, [filterNames]);

  const filterPreviewArray = sortedFilterNames.map(filter => {
    if (!items.length) {
      return null;
    }

    return (
      <div className={s.filterItem} key={filter}>
        <div className={s.filterImageWrapper}>
          <Image
            alt={`preview of the ${filter} photo filter`}
            {...registerImage(filter)}
            fill
            onClick={() => handleFilterChange?.(filter)}
            src={items[selectedIndex].src}
          />
        </div>
        <Typography.Regular16 className={s.filterTitle}>
          {capitalise(filter, true)}
        </Typography.Regular16>
      </div>
    );
  });

  return (
    <ModalCard className={s.cardRoot}>
      <ModalCard.Header className={s.header}>
        <IconButton onClick={onPrevClick}>
          <ArrowIOSBack />
        </IconButton>
        <Typography.H1 className={s.headerTitle} component={'h2'}>
          Filters
        </Typography.H1>
        <Button onClick={onNextClick} variant={'text'}>
          Next
        </Button>
      </ModalCard.Header>

      <div className={s.contentWrapper}>
        <PhotoGallery
          additionalClass={s.galleryWrapper}
          galleryRef={innerGalleryRef}
          items={renderItems}
          onSlide={handleSlideChange}
          startIndex={selectedIndex}
          {...restGalleryProps}
        />
        <ModalCard.Content className={s.filtersList}>{filterPreviewArray}</ModalCard.Content>
      </div>
    </ModalCard>
  );
};
