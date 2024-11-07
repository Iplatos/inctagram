import { FC, useState } from 'react';

import { MyProfilePostCardModal } from '@/features/post/my-profile-card-modal/my-profile-card-modal';
import { openModal } from '@/shared/api/modal-slice';
import {
  Post,
  useDeletePostMutation,
  useUpdatePostLikeStatusMutation,
  useUpdatePostMutation,
} from '@/shared/api/posts-api';
import { useAppDispatch } from '@/shared/api/pretyped-redux-hooks';
import { useGetMyProfileQuery } from '@/shared/api/users-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Typography } from '@/shared/ui';
import { CroppedImage } from '@/shared/ui/croppedImage';
import clsx from 'clsx';

import s from './postsList.module.scss';

export type PostsListProps = {
  className?: string;
  posts?: Post[];
};

export const PostsList: FC<PostsListProps> = ({ className, posts = [] }) => {
  const { postsList: t } = useTranslation().t.common;
  const dispatch = useAppDispatch();
  const { data: myProfile } = useGetMyProfileQuery();
  const [deletePostTrigger, { isLoading: isDeletingPost }] = useDeletePostMutation();
  const [updatePotTrigger, { isLoading: isUpdatingPost }] = useUpdatePostMutation();
  const [updateLikeStatusTrigger, { isLoading: isUpdatingLikeStatus }] =
    useUpdatePostLikeStatusMutation();

  const [openPostModal, setOpenPostModal] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);

  const post = posts[selectedPostIndex];

  const handlePostModalOpen = (index: number) => {
    setSelectedPostIndex(index);
    setOpenPostModal(true);
  };

  const handlePostModalClose = () => {
    const isPostModalDisabled = isDeletingPost || isUpdatingPost || isUpdatingLikeStatus;

    if (!isPostModalDisabled) {
      setOpenPostModal(false);
    }
  };

  const handlePostDelete = async () => {
    await deletePostTrigger({ postId: post.id, uploadIds: post.images.map(i => i.uploadId) });
    setOpenPostModal(false);
  };

  const handlePostEdit = (description: string) => {
    updatePotTrigger({ description, postId: post.id });
  };

  const handlePostLikeToggle = () => {
    updateLikeStatusTrigger({ likeStatus: post.isLiked ? 'NONE' : 'LIKE', postId: post.id });
  };

  return (
    <>
      <section className={clsx(s.container, className)}>
        {posts.length ? (
          posts.map(({ images }, index) => (
            <div className={s.post} key={index}>
              <CroppedImage
                alt={''}
                fill
                onClick={() => handlePostModalOpen(index)}
                src={images[0].url}
              />
            </div>
          ))
        ) : (
          <div className={s.messageContainer}>
            <Typography.H1 className={s.message} component={'h2'}>
              {t.noPostsMessage}
            </Typography.H1>
            <Button onClick={() => dispatch(openModal())}>{t.addPostButton}</Button>
          </div>
        )}
      </section>

      {post && (
        <MyProfilePostCardModal
          date={post.createdAt}
          description={post.description}
          headerProps={{ avatar: myProfile?.avatars[0].url, userName: post.userName }}
          images={post.images.map(i => i.url)}
          isLiked={post.isLiked}
          // reset the local state containing the `description` for a particular post
          key={post.description}
          likesCount={post.likesCount}
          onClose={handlePostModalClose}
          onDeletePost={handlePostDelete}
          onEditPost={handlePostEdit}
          onPostLikeToggle={handlePostLikeToggle}
          open={openPostModal}
        />
      )}
    </>
  );
};
