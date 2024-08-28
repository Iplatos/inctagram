import { useState } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import {
  FriendPrivatePostCard,
  ProfilePrivatePostCard,
  PublicPostCard,
} from '@/features/post/post-card';
import { PrivatePostCommentProps } from '@/features/post/post-comment/private-post-comment';
import { PublicPostCommentProps } from '@/features/post/post-comment/public-post-comment';
import {
  PrivateFriendPostModal,
  PrivateProfilePostModal,
  PublicPostModal,
} from '@/features/post/post-modal';
import { Button, IconButton, SelectBox } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Test() {
  const comments: PublicPostCommentProps[] = [
    {
      answers: [
        {
          commentId: 'comment1',
          createdAt: '2009-07-01T11:00:00Z',
          id: 'answer1',
          likesCount: 3,
          text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
          userName: 'User2',
        },
        {
          commentId: 'comment1',
          createdAt: '2024-07-01T12:00:00Z',
          id: 'answer2',
          likesCount: 1,
          text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
          userName: 'User3',
        },
      ],
      commentId: 'comment1',
      createdAt: '2024-07-01T10:00:00Z',
      id: 'comment1',
      likesCount: 5,
      text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
      userName: 'User1',
    },
    {
      answers: [
        {
          commentId: 'comment2',
          createdAt: '2024-07-02T11:00:00Z',
          id: 'answer3',
          likesCount: 2,
          text: 'Answer to the second comment.Answer to the second comment.Answer to the second comment.Answer to the second comment.',
          userName: 'User5',
        },
      ],
      commentId: 'comment2',
      createdAt: '2024-07-02T10:00:00Z',
      id: 'comment2',
      likesCount: 2,
      text: 'This is the second comment.This is the second comment.This is the second comment.This is the second comment.',
      userName: 'User4',
    },
    {
      answers: [],
      commentId: 'comment3',
      createdAt: '2024-07-03T10:00:00Z',
      id: 'comment3',
      likesCount: 0,
      text: 'This is the third comment with no answers.This is the third comment with no answers.This is the third comment with no answers.',
      userName: 'User6',
    },
  ];
  const privateComments: PrivatePostCommentProps[] = [
    {
      answers: [
        {
          commentId: 'privateComment1',
          createdAt: '2024-07-01T11:00:00Z',
          id: 'privateAnswer1',
          isLiked: true,
          likesCount: 3,
          text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
          userName: 'User2',
        },
        {
          commentId: 'privateComment1',
          createdAt: '2024-07-01T12:00:00Z',
          id: 'privateAnswer2',
          isLiked: false,
          likesCount: 1,
          text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
          userName: 'User3',
        },
      ],
      commentId: 'privateComment1',
      createdAt: '2024-07-01T10:00:00Z',
      id: 'privateComment1',
      isLiked: true,
      likesCount: 5,
      text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
      userName: 'User1',
    },
    {
      answers: [
        {
          commentId: 'privateComment2',
          createdAt: '2024-07-01T11:00:00Z',
          id: 'privateAnswer3',
          isLiked: true,
          likesCount: 3,
          text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
          userName: 'User2',
        },
        {
          commentId: 'privateComment2',
          createdAt: '2024-07-01T12:00:00Z',
          id: 'privateAnswer4',
          isLiked: false,
          likesCount: 1,
          text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
          userName: 'User3',
        },
      ],
      commentId: 'privateComment2',
      createdAt: '2024-07-01T10:00:00Z',
      id: 'privateComment2',
      isLiked: true,
      likesCount: 5,
      text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
      userName: 'User1',
    },
    {
      answers: [],
      commentId: 'privateComment3',
      createdAt: '2024-07-03T10:00:00Z',
      id: 'privateComment3',
      isLiked: false,
      likesCount: 0,
      text: 'This is the third comment with no answers.This is the third comment with no answers.This is the third comment with no answers.',
      userName: 'User6',
    },
  ];

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
