import { FC, PropsWithChildren } from 'react';

import { PhotoGallery } from '@/features/photo-gallery';
import { resolveImageSrcToString } from '@/shared/helpers';
import { ModalCard } from '@/shared/ui';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './card.module.scss';

export type PostCardSlot = 'cardRoot' | 'contentWrapper' | 'gallery' | 'outerWrapper';
export type PostCardClasses = { [P in PostCardSlot]?: string };

export type PostCardProps = PropsWithChildren<{
  classes?: PostCardClasses;
  images: (StaticImport | string)[];
}>;

export const PostCard: FC<PostCardProps> = ({ children, classes = {}, images }) => {
  const cls = getClassNames(classes);

  return (
    <ModalCard.Root className={cls.cardRoot}>
      <div className={cls.outerWrapper}>
        <PhotoGallery
          additionalClass={cls.gallery}
          items={images.map(i => ({ original: resolveImageSrcToString(i) as string }))}
        />

        <div className={cls.contentWrapper}>{children}</div>
      </div>
    </ModalCard.Root>
  );
};

const getClassNames = (classes: PostCardClasses): Required<PostCardClasses> => ({
  cardRoot: clsx(s.cardRoot, classes.cardRoot, 'post-card-root'),
  contentWrapper: clsx(s.contentWrapper, classes.contentWrapper),
  gallery: clsx(s.gallery, classes.gallery),
  outerWrapper: clsx(s.outerWrapper, classes.outerWrapper),
});
