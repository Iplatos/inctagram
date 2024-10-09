import { useEffect } from 'react';

import { getRunningQueriesThunk } from '@/shared/api/base-api';
import { publicPageSlice } from '@/shared/api/public-page-slice';
import { publicPostsApi } from '@/shared/api/public-posts-api';
import { PublicUserApi } from '@/shared/api/public-user-api';
import { useAppDispatch, wrapper } from '@/shared/api/store';
import { PublicAPIResponse } from '@/shared/types/common.types';
import { PublicPostsResponse, PublicUsersResponse } from '@/shared/types/public.types';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { PublicPosts } from '@/widgets/PublicPosts/PublicPosts';
import { Header } from '@/widgets/header';

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const users = await store.dispatch(PublicUserApi.endpoints.getTotalUsersCount.initiate());

  const posts = await store.dispatch(
    publicPostsApi.endpoints.getPublicPosts.initiate({ pageSize: 4 })
  );

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      posts,
      users,
    },
    revalidate: 60,
  };
});

type Props = {
  posts: PublicAPIResponse<PublicPostsResponse>;
  users: PublicAPIResponse<PublicUsersResponse>;
};

function PublicPage(props: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      publicPageSlice.actions.publicPageDataReceived({
        posts: props.posts.data,
        totalUsersCount: props.users.data.totalCount,
      })
    );
  }, []);

  return (
    <>
      <HeadMeta title={'Public Page'} />
      <Header />
      <PublicPosts posts={props.posts.data.items} usersCount={props.users.data.totalCount} />
    </>
  );
}

export default PublicPage;
