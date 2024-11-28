import { NextPageWithLayout } from '@/pages/_app';
import {
  CreatePostParams,
  useCreatePostMutation,
  useDeletePostMutation,
} from '@/shared/api/posts-api';
import { Button } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

import IMG from './IMG.jpg';

const Test: NextPageWithLayout = () => {
  const [createPost, { data: createPostData }] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const fetchImageFile = async (src: string) => {
    const response = await fetch(src);
    const blob = await response.blob();

    return new File([blob], 'IMG.jpg', { type: 'image/jpeg' });
  };

  const createPostHandler = async () => {
    const file = await fetchImageFile(IMG.src);
    const data: CreatePostParams = {
      description: 'Create new post',
      files: [file],
    };

    createPost(data);
  };

  const deletePostHandler = () => {
    deletePost({
      postId: 2535,
      uploadIds: ['671d796080446fc979886540'],
    });
  };

  return (
    <>
      <HeadMeta title={'test'} />
      <div>
        <Button onClick={createPostHandler}>Create Post</Button>
        <Button onClick={deletePostHandler}>Delete Post</Button>
      </div>
    </>
  );
};

Test.getLayout = getLayout;
export default Test;
