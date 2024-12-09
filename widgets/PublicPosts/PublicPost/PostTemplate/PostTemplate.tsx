import ReactTimeAgo from 'react-time-ago';

import ImageNotFound from '@/assets/img/img-not-found.webp';
import { Post } from '@/shared/types/public.types';
import { Button, Typography, UserBanner } from '@/shared/ui';
import Image from 'next/image';

import s from '../publicPost.module.scss';

type Props = {
  descriptionClassName: string;
  fullText: boolean;
  height: number;
  locale?: string;
  onPostPreviewClick?: () => void;
  post: Post;
  setFullText: (fullText: boolean) => void;
  toggleButton: string;
  width: number;
};

export const PostTemplate = ({
  descriptionClassName,
  fullText,
  height,
  locale,
  onPostPreviewClick,
  post,
  setFullText,
  toggleButton,
  width,
}: Props) => {
  return (
    <div className={s.post}>
      <Image
        alt={'post'}
        className={s.image}
        height={height}
        onClick={onPostPreviewClick}
        src={post.images[0]?.url || ImageNotFound}
        width={width}
      />
      <UserBanner
        avatarProps={{ src: post.avatarOwner }}
        classes={{ userBannerRoot: s.userBanner }}
        link={`public-posts/${post.id}`}
        userName={post.userName}
      />
      <div className={s['time-container']}>
        <ReactTimeAgo className={s.time} date={new Date(post.createdAt)} locale={locale} />
      </div>
      <div className={s[descriptionClassName]}>{post.description} </div>
      {post.description.length > 92 && (
        <Button onClick={() => setFullText(fullText)} style={{ padding: 0 }} variant={'text'}>
          <Typography.RegularLink className={s['show-hide']}>{toggleButton}</Typography.RegularLink>
        </Button>
      )}
    </div>
  );
};
