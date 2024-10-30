import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { useTranslation } from '@/shared/hooks';
import { Replace } from '@/shared/types/helpers';
import { IconButton, Typography } from '@/shared/ui';

import s from '@/features/post/post-comment/post-comment.module.scss';

import { PostComment, PostCommentProps, PostCommentType } from './post-comment';

export type PrivatePostCommentType = {
  isLiked: boolean;
  likesCount: number;
} & PostCommentType;

export type PrivatePostCommentProps = Replace<
  PostCommentProps<PrivatePostCommentType>,
  {
    addNewAnswer?: (id: string, userName: string, commentId: string) => void;
    isLiked: boolean;
    onLikeClick?: () => void;
  }
>;

export const PrivatePostComment = ({
  addNewAnswer,
  isLiked,
  onLikeClick,
  ...props
}: PrivatePostCommentProps) => {
  const { t } = useTranslation();

  const addNewAnswerForComment = () => addNewAnswer?.(props.id, props.userName, props.commentId);

  return (
    <PostComment
      infoSectionRender={({ likes, time }) => (
        <>
          {time}
          {likes}
          <Typography.Semibold12
            className={s.infoSectionAction}
            component={'button'}
            onClick={addNewAnswerForComment}
          >
            {t.post.comment.answer}
          </Typography.Semibold12>
        </>
      )}
      primaryAction={
        <IconButton onClick={onLikeClick} size={'small'}>
          {isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
        </IconButton>
      }
      renderAnswer={PrivatePostComment}
      {...props}
    />
  );
};
