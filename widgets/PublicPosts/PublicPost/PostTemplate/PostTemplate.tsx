import ReactTimeAgo from 'react-time-ago';

import { PhotoGallery } from '@/features';
import { Post } from '@/shared/types/public.types';
import { Button, Typography } from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';

import s from '../publicPost.module.scss';

type Props = {
  descriptionClassName: string;
  fullText: boolean;
  height: number;
  locale?: string;
  post: Post;
  setFullText: (fullText: boolean) => void;
  toggleButton: string;
  width: number;
};

export const PostTemplate = (props: Props) => {
  const { descriptionClassName, fullText, height, locale, post, setFullText, toggleButton, width } =
    props;

  const ImagesUrl = post.images.map(el => el.url);

  const GalleryImages = ImagesUrl.map(el => {
    return {
      original: el,
    };
  });

  return (
    <div className={s.post}>
      <div>
        <Link href={`/public-posts/${post.id}`}>
          <Image
            alt={'post'}
            className={s.image}
            height={height}
            src={post.images[0].url}
            width={width}
          />
        </Link>
        <div className={s.container}>
          <Image
            alt={'mini-avatar'}
            className={s.miniature}
            height={'36'}
            src={post.avatarOwner}
            width={'36'}
          />
          <Typography.H2>{post.userName}</Typography.H2>
        </div>
        <div className={s['time-container']}>
          <ReactTimeAgo className={s.time} date={new Date(post.createdAt)} locale={locale} />
        </div>
        <div className={s[descriptionClassName]}>{post.description} </div>
        {post.description.length > 92 && (
          <Button onClick={() => setFullText(fullText)} style={{ padding: 0 }} variant={'text'}>
            <Typography.RegularLink className={s['show-hide']}>
              {toggleButton}
            </Typography.RegularLink>
          </Button>
        )}
      </div>
    </div>
  );
};
