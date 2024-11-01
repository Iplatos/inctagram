import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { PostComment, PostCommentProps, PostCommentType } from '@/features/post/comment';
import { useTranslation } from '@/shared/hooks';
import { Replace } from '@/shared/types/helpers';
import { IconButton } from '@/shared/ui';

export type PrivatePostCommentType = {
  isLiked: boolean;
} & PostCommentType;

export type PrivatePostCommentProps = Replace<
  PostCommentProps<PrivatePostCommentType>,
  {
    isLiked: boolean;
    onAnswer?: () => void;
    onAnswerLikeToggle?: () => void;
    onCommentLikeToggle?: () => void;
  }
>;

export const PrivatePostComment = ({
  isLiked,
  onAnswer,
  onAnswerLikeToggle,
  onCommentLikeToggle,
  ...props
}: PrivatePostCommentProps) => {
  const t = useTranslation().t.post.comment;

  return (
    <PostComment
      additionalInfoItems={[{ bold: true, children: t.answer, onClick: onAnswer }]}
      primaryAction={
        <IconButton onClick={onCommentLikeToggle} size={'small'}>
          {isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
        </IconButton>
      }
      renderAnswer={answer => (
        <PrivatePostComment
          onAnswer={onAnswer}
          onCommentLikeToggle={onAnswerLikeToggle}
          {...answer}
        />
      )}
      {...props}
    />
  );
};
