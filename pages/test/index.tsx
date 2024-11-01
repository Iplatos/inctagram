import { useState } from 'react';

import { PostCommentProps } from '@/features/post/comment';
import {
  PrivateFriendPostModal,
  PrivateProfilePostModal,
  PublicPostModal,
} from '@/features/post/post-modal';
import { PrivatePostCommentProps } from '@/features/post/private-comment';
import { Button, SelectBox } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Test() {
  const comments: PostCommentProps[] = [];
  const privateComments: PrivatePostCommentProps[] = [];

  type VariantsCardT = 'friend' | 'profile' | 'public';
  const [variant, setVariant] = useState<VariantsCardT | string>('public');
  const setVariantHandler = (option: string) => {
    if (option !== '') {
      setVariant(option);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <HeadMeta title={'test'} />
      {/* eslint-disable-next-line no-nested-ternary */}
      {variant === 'public' ? (
        <>
          <Button onClick={() => setOpen(true)}>Click me</Button>
          <PublicPostModal
            comments={comments}
            createdAt={'2024-07-01T11:00:00Z'}
            isOpen={open}
            likesCount={25456454}
            onClose={setOpen}
            userName={'userName'}
          />
        </>
      ) : variant === 'profile' ? (
        <>
          <Button onClick={() => setOpen(true)}>Click me</Button>
          <PrivateProfilePostModal
            comments={privateComments}
            createdAt={'2024-07-01T11:00:00Z'}
            isOpen={open}
            isPostLiked={false}
            likesCount={25456454}
            onClose={setOpen}
            postId={'21321sdf'}
            userId={'das4d5as4d5as4d'}
            userName={'userName'}
          />
        </>
      ) : (
        <>
          <Button onClick={() => setOpen(true)}>Click me</Button>
          <PrivateFriendPostModal
            comments={privateComments}
            createdAt={'2024-07-01T11:00:00Z'}
            isOpen={open}
            isPostLiked={false}
            likesCount={25456454}
            onClose={setOpen}
            postId={'21321sdf'}
            userId={'das4d5as4d5as4d'}
            userName={'userName'}
          />
        </>
      )}
      <SelectBox
        defaultValue={'public'}
        onChangeFn={setVariantHandler}
        options={[
          { label: 'friend', value: 'friend' },
          { label: 'profile', value: 'profile' },
          { label: 'public', value: 'public' },
        ]}
      />
    </>
  );
}

Test.getLayout = getLayout;
export default Test;
