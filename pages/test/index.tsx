import { useState } from 'react';

import {
  FriendPrivatePostCard,
  ProfilePrivatePostCard,
  PublicPostCard,
} from '@/features/post/post-card';
import { PrivatePostCommentProps } from '@/features/post/post-comment/private-post-comment';
import { PublicPostCommentProps } from '@/features/post/post-comment/public-post-comment';
import { SelectBox } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Test() {
  const comments: PublicPostCommentProps[] = [
    {
      answers: [
        {
          createdAt: '2009-07-01T11:00:00Z',
          likesCount: 3,
          text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
          userName: 'User2',
        },
        {
          createdAt: '2024-07-01T12:00:00Z',
          likesCount: 1,
          text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
          userName: 'User3',
        },
      ],
      createdAt: '2024-07-01T10:00:00Z',
      likesCount: 5,
      text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
      userName: 'User1',
    },
    {
      answers: [
        {
          createdAt: '2024-07-02T11:00:00Z',
          likesCount: 2,
          text: 'Answer to the second comment.Answer to the second comment.Answer to the second comment.Answer to the second comment.',
          userName: 'User5',
        },
      ],
      createdAt: '2024-07-02T10:00:00Z',
      likesCount: 2,
      text: 'This is the second comment.This is the second comment.This is the second comment.This is the second comment.',
      userName: 'User4',
    },
    {
      answers: [],
      createdAt: '2024-07-03T10:00:00Z',
      likesCount: 0,
      text: 'This is the third comment with no answers.This is the third comment with no answers.This is the third comment with no answers.',
      userName: 'User6',
    },
  ];
  const privateComments: PrivatePostCommentProps[] = [
    {
      answers: [
        {
          createdAt: '2024-07-01T11:00:00Z',
          isLiked: true,
          likesCount: 3,
          text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
          userName: 'User2',
        },
        {
          createdAt: '2024-07-01T12:00:00Z',
          isLiked: false,
          likesCount: 1,
          text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
          userName: 'User3',
        },
      ],
      createdAt: '2024-07-01T10:00:00Z',
      isLiked: true,
      likesCount: 5,
      text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
      userName: 'User1',
    },
    {
      answers: [
        {
          createdAt: '2024-07-01T11:00:00Z',
          isLiked: true,
          likesCount: 3,
          text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
          userName: 'User2',
        },
        {
          createdAt: '2024-07-01T12:00:00Z',
          isLiked: false,
          likesCount: 1,
          text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
          userName: 'User3',
        },
      ],
      createdAt: '2024-07-01T10:00:00Z',
      isLiked: true,
      likesCount: 5,
      text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
      userName: 'User1',
    },
    {
      answers: [],
      createdAt: '2024-07-03T10:00:00Z',
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

  return (
    <>
      <HeadMeta title={'test'} />
      <SelectBox
        defaultValue={'public'}
        onChangeFn={setVariantHandler}
        options={[
          { label: 'friend', value: 'friend' },
          { label: 'profile', value: 'profile' },
          { label: 'public', value: 'public' },
        ]}
        style={{ marginBottom: '20px' }}
      />
      {/* eslint-disable-next-line no-nested-ternary */}
      {variant === 'public' ? (
        <PublicPostCard
          comments={comments}
          createdAt={'2024-07-01T11:00:00Z'}
          likesCount={25456454}
          userName={'userName'}
        />
      ) : variant === 'profile' ? (
        <ProfilePrivatePostCard
          comments={privateComments}
          createdAt={'2024-07-01T11:00:00Z'}
          isPostLiked={false}
          likesCount={25456454}
          postId={'21321sdf'}
          userId={'das4d5as4d5as4d'}
          userName={'userName'}
        />
      ) : (
        <FriendPrivatePostCard
          comments={privateComments}
          createdAt={'2024-07-01T11:00:00Z'}
          isPostLiked={false}
          likesCount={25456454}
          postId={'21321sdf'}
          userId={'das4d5as4d5as4d'}
          userName={'userName'}
        />
      )}
    </>
  );
}

Test.getLayout = getLayout;
export default Test;
