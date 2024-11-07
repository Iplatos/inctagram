import { getRunningQueriesThunk } from '@/shared/api/base-api';
import { publicPostsApi } from '@/shared/api/public-posts-api';
import { PublicUserApi } from '@/shared/api/public-user-api';
import { wrapper } from '@/shared/api/store';
import { PublicPostsResponse, PublicUsersResponse } from '@/shared/types/public.types';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { PublicPosts } from '@/widgets/PublicPosts/PublicPosts';
import { Header } from '@/widgets/header';

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const { data: users } = await store.dispatch(
    PublicUserApi.endpoints.getTotalUsersCount.initiate()
  );

  const { data: posts } = await store.dispatch(
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
  posts: PublicPostsResponse;
  users: PublicUsersResponse;
};

function PublicPage({ posts, users }: Props) {
  return (
    <>
      <HeadMeta title={'Public Page'} />
      <Header />
      <PublicPosts posts={posts.items} usersCount={users.totalCount} />
    </>
  );
}

export default PublicPage;
