import { ElementRef, FC, MutableRefObject, memo } from 'react';

import { PhotoGalleryPreviewImageWrapper } from '@/entities/photo-gallery';
import { CCGramFilterOrString, useCCGramFilter } from '@/shared/hooks';
import Image from 'next/image';

export type FilterPhotoCardItem = { filter: CCGramFilterOrString; src: string };

export type RenderFilterPhotoCardItemProps = {
  index: number;
  item: FilterPhotoCardItem;
  previewItemsRef?: MutableRefObject<Map<FilterPhotoCardItem, ElementRef<'img'>>>;
  registerImage: ReturnType<typeof useCCGramFilter>['registerImage'];
  src: string;
};

export const FilterPhotoCardItemRender: FC<RenderFilterPhotoCardItemProps> = memo(
  ({ index, item, previewItemsRef, registerImage, src }) => (
    <PhotoGalleryPreviewImageWrapper>
      <Image
        alt={'preview a photo with the selected filter'}
        className={'image-gallery-slide-image'}
        data-test-id={`preview-filtered-image-${index}`}
        fill
        ref={node => {
          const map = previewItemsRef?.current;

          if (node) {
            map?.set(item, node);
          } else {
            map?.delete(item);
          }
        }}
        src={src}
        {...registerImage(item.filter)}
      />
    </PhotoGalleryPreviewImageWrapper>
  )
);
