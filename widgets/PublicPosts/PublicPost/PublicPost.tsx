import { useState } from 'react';
import { ReactImageGalleryItem } from 'react-image-gallery';

import { PhotoGallery } from '@/features';
import { getPhotoGalleryMockImages } from '@/features/photo-gallery/photo-gallery.stories';
import { Post } from '@/shared/types/public.types';

import { PostTemplate } from './PostTemplate/PostTemplate';

type Props = {
  hide: string;
  locale?: string;
  onPostPreviewClick?: () => void;
  post: Post;
  showMore: string;
};

export const PublicPost = (props: Props) => {
  const [fullText, setFullText] = useState(false);

  const { hide, locale, post, showMore } = props;

  return (
    <>
      {fullText ? (
        <PostTemplate
          descriptionClassName={'fullText'}
          fullText={false}
          height={120}
          locale={locale}
          onPostPreviewClick={props.onPostPreviewClick}
          post={post}
          setFullText={() => setFullText(false)}
          toggleButton={hide}
          width={234}
        />
      ) : (
        <PostTemplate
          descriptionClassName={'text'}
          fullText
          height={240}
          locale={locale}
          onPostPreviewClick={props.onPostPreviewClick}
          post={post}
          setFullText={() => setFullText(true)}
          toggleButton={showMore}
          width={234}
        />
      )}
    </>
  );
};
