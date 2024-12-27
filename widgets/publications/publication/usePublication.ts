import { useCreateCommentMutation } from '@/shared/api/comments-answers/comments-answers-api';
import {
  useGetCommentsQuery,
  useGetPostsByIdQuery,
  useUpdatePostLikeStatusMutation,
} from '@/shared/api/posts-api';
import { useRelativeTime } from '@/shared/hooks';

type Props = {
  postId: number;
};

export const usePublication = ({ postId }: Props) => {
  const [updateLikeStatus, { isLoading: isLoadingLikeStatus }] = useUpdatePostLikeStatusMutation();
  const [createPostComment, { isLoading: isLoadingCreatedComment }] = useCreateCommentMutation();
  const { data: postData, isLoading } = useGetPostsByIdQuery({ postId });
  const { data: commentsData } = useGetCommentsQuery({ postId });
  const commentsCount = commentsData?.totalCount;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const relativeTimeString = postData?.createdAt ? useRelativeTime(postData.createdAt) : '';

  const avatarWhoLikes = postData?.avatarWhoLikes.map(img => ({
    avatar: img,
    userName: 'Avatar',
  }));

  const handleCommentCreate = ({ comment }: { comment: string }) => {
    if (postData?.id) {
      createPostComment({
        comment: comment,
        postId: postData.id,
      });
    }
  };

  const onLikeToggle = () => {
    updateLikeStatus({ likeStatus: postData?.isLiked ? 'NONE' : 'LIKE', postId });
  };

  const onShare = () => {
    console.log('clicked share');
  };

  const onAddBookmark = () => {
    console.log('clicked addBookmark');
  };

  return {
    avatarWhoLikes,
    commentsCount,
    commentsData,
    handleCommentCreate,
    isLoading,
    isLoadingCreatedComment,
    isLoadingLikeStatus,
    onAddBookmark,
    onLikeToggle,
    onShare,
    postData,
    relativeTimeString,
  };
};
