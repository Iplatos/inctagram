import { useState } from 'react';

import { getRunningQueriesThunk } from '@/shared/api/base-api';
import { publicPostsApi } from '@/shared/api/public-posts-api';
import { PublicUserApi } from '@/shared/api/public-user-api';
import { wrapper } from '@/shared/api/store';
import {
  PublicPostByIdResponse,
  PublicPostsByUserIdResponse,
  PublicProfileByIdResponse,
} from '@/shared/types/public.types';
import { TestPostModal } from '@/widgets/TestPostModal/TestPostModal';
import { Header } from '@/widgets/header';
import { UserProfile } from '@/widgets/user-profile';

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const { postId } = context.query;

  const { data: post } = await store.dispatch(
    publicPostsApi.endpoints.getPublicPostById.initiate(postId)
  );

  let userPosts = null;

  if (post) {
    const result = await store.dispatch(
      publicPostsApi.endpoints.getPublicPostsByUserId.initiate({ userId: post.ownerId })
    );

    userPosts = result.data;
  }

  let userProfile = null;

  if (post) {
    const result = await store.dispatch(
      PublicUserApi.endpoints.getUserPublicProfile.initiate(post.ownerId)
    );

    userProfile = result.data;
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return { props: { post, userPosts, userProfile } };
});

type Props = {
  post: PublicPostByIdResponse;
  userPosts: PublicPostsByUserIdResponse;
  userProfile: PublicProfileByIdResponse;
};

const PublicPostById = (props: Props) => {
  const [open, setOpen] = useState(true);

  const { post, userPosts, userProfile } = props;

  const urls = userPosts.items.flatMap(item =>
    item.images.map(image => {
      return {
        src: image.url,
      };
    })
  );

  const avatar = { url: userProfile.avatars[0]?.url };

  return (
    <>
      <Header />
      <TestPostModal open={open} post={post} setOpen={setOpen} />
      <div style={{ marginLeft: '100px', marginTop: '100px' }}>
        <UserProfile
          aboutMe={userProfile.aboutMe}
          avatarProps={avatar ?? null}
          posts={urls}
          userName={userProfile.userName}
        />
      </div>
    </>
  );
};

export default PublicPostById;
