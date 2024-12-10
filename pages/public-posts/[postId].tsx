import { useState } from 'react';

import { getRunningQueriesThunk } from '@/shared/api/base-api';
import { publicPostsApi } from '@/shared/api/public-posts-api';
import { PublicUserApi } from '@/shared/api/public-user-api';
import { wrapper } from '@/shared/api/store';
import {
  Post,
  PublicPostByIdResponse,
  PublicPostsByUserIdResponse,
  PublicProfileByIdResponse,
} from '@/shared/types/public.types';
import { TestPostModal } from '@/widgets/TestPostModal/TestPostModal';
import { getPublicLayout } from '@/widgets/layouts';
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
  const [open, setOpen] = useState(false);

  const { post, userPosts, userProfile } = props;

  // TODO: Consider removing second `Post` type from the project

  const avatar = { url: userProfile.avatars[0]?.url };

  return (
    <>
      <TestPostModal open={open} post={post} setOpen={setOpen} />
      <div>
        <UserProfile
          aboutMe={userProfile.aboutMe}
          avatarProps={avatar ?? null}
          posts={userPosts.items}
          userName={userProfile.userName}
        />
      </div>
    </>
  );
};

PublicPostById.getLayout = getPublicLayout;
export default PublicPostById;
