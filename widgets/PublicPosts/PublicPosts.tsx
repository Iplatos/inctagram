import { useState } from 'react';

import { useTranslation } from '@/shared/hooks';
import { Post } from '@/shared/types/public.types';
import { PublicPagePostModal } from '@/widgets/PublicPosts/post-modal';
import { UsersCountCard } from '@/widgets/UsersCountCard/UsersCountCard';
import { useRouter } from 'next/router';

import s from './publicPosts.module.scss';

import { PublicPost } from './PublicPost/PublicPost';

type Props = {
  posts?: Post[];
  usersCount?: number;
};

export const PublicPosts = ({ posts, usersCount }: Props) => {
  const { publicPage: t } = useTranslation().t;

  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);

  const post = posts?.[selectedPostIndex];

  const handleModalOpen = (index: number) => {
    setSelectedPostIndex(index);
    setOpenModal(true);
  };

  return (
    <div className={s.page}>
      <div className={s['count-panel']}>
        <UsersCountCard userCount={usersCount} />
      </div>
      <div className={s.posts}>
        {posts?.map((post, index) => (
          <PublicPost
            hide={t.hide}
            key={post.id}
            locale={router.locale}
            onPostPreviewClick={() => handleModalOpen(index)}
            post={post}
            showMore={t.showMore}
          />
        ))}
      </div>
      {post && (
        <PublicPagePostModal
          onClose={() => setOpenModal(false)}
          open={openModal}
          post={posts[selectedPostIndex]}
        />
      )}
    </div>
  );
};
