import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import {
  PostComment,
  PostCommentProps,
  PostCommentType,
} from '@/entities/post/public-card/comment';
import { useTranslation } from '@/shared/hooks';
import { Replace } from '@/shared/types/helpers';
import { IconButton } from '@/shared/ui';

import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

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
        <IconButton
          className={modalCardS.headerIconButton}
          onClick={onCommentLikeToggle}
          size={'small'}
        >
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
