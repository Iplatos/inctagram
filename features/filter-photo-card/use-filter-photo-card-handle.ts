import { ForwardedRef, useImperativeHandle, useRef } from 'react';
import ReactImageGallery from 'react-image-gallery';

import { CCGramImageParsers, useCCGramFilter } from '@/shared/hooks';

type PartialPhotoGalleryRefObject = Pick<ReactImageGallery, 'getCurrentIndex' | 'slideToIndex'>;

export type FilterPhotoCardRefObject = PartialPhotoGalleryRefObject & CCGramImageParsers;

export const useFilterPhotoCardHandle = (ref?: ForwardedRef<FilterPhotoCardRefObject>) => {
  const filter = useCCGramFilter();

  const innerGalleryRef = useRef<ReactImageGallery>(null);

  useImperativeHandle(ref, () => ({
    getBlob: (image, options) => filter.getBlob(image, options),
    getCurrentIndex: () => innerGalleryRef?.current?.getCurrentIndex() ?? -1,
    getDataURL: (image, options) => filter.getDataURL(image, options),
    slideToIndex: index => innerGalleryRef?.current?.slideToIndex(index),
  }));

  return { filter, innerGalleryRef };
};
