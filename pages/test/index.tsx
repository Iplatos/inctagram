import { useEffect, useState } from 'react';

import {
  CreatePostParams,
  useCreatePostMutation,
  useDeletePostMutation,
} from '@/shared/api/posts-api';
import { Button } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

import IMG from './IMG.jpg';

function Test() {
  const [createPost, { data: createPostData }] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(IMG.src);
      const blob = await response.blob();
      const file = new File([blob], 'IMG.jpg', { type: 'image/jpeg' });

      setFile(file);
    };

    fetchImage();
  }, []);

  const data: CreatePostParams = {
    description: 'Create new post',
    files: file ? [file] : [],
  };

  const createPostHandler = () => {
    if (file) {
      createPost(data);
      console.log(data);
    } else {
      console.log('File not loaded yet');
    }
  };

  const deletePostHandler = () => {
    deletePost({
      postId: 2535,
      uploadIds: ['671d796080446fc979886540'],
    });
  };

  console.log(createPostData);

  return (
    <>
      <HeadMeta title={'test'} />
      <div>
        <Button onClick={createPostHandler}>Create Post</Button>
        <Button onClick={deletePostHandler}>Delete Post</Button>
      </div>
    </>
  );
}

Test.getLayout = getLayout;
export default Test;
