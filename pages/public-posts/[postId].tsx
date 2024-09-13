import { publicPostsApi } from '@/shared/api/public-posts-api';
import { wrapper } from '@/shared/api/store';
import { PublicAPIResponse } from '@/shared/types/common.types';
import { PublicPostByIdResponse } from '@/shared/types/public.types';
import { TestPostModal } from '@/widgets/TestPostModal/TestPostModal';
import { Header } from '@/widgets/header';

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const { postId } = context.query;

  const post = await store.dispatch(publicPostsApi.endpoints.getPublicPostById.initiate(postId));

  let userProfile = null;

  if (post.data && post.data?.data) {
    userProfile = await store.dispatch(
      publicPostsApi.endpoints.getPublicPostsByUserId.initiate(post.data.data.ownerId)
    );
  }

  return { props: { post, userProfile } };
});

type Props = {
  post: PublicAPIResponse<PublicPostByIdResponse>;
  userProfile: any;
};

const PublicPostById = (props: Props) => {
  console.log(props.userProfile);

  return (
    <>
      <Header />
      <TestPostModal post={props.post.data} />
    </>
  );
};

export default PublicPostById;
