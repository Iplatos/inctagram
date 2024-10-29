import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { IconButton, Typography } from '@/shared/ui';

import s from '@/features/post/post-comment/post-comment.module.scss';

import { PostComment, PostCommentProps } from './post-comment';

export type PrivateAnswer = {
  isLiked: boolean;
  likesCount: number;
} & Omit<PostCommentProps, 'answersSection, answersCount'>;

export type PrivatePostCommentProps = {
  addNewAnswer?: (id: string, userName: string, commentId: string) => void;
  answers?: PrivateAnswer[];
  isLiked: boolean;
  toggleIsLiked?: (isLiked: boolean) => void;
} & PostCommentProps;

export const PrivatePostComment = ({
  addNewAnswer,
  answers,
  isLiked,
  ...props
}: PrivatePostCommentProps) => {
  const { t } = useTranslation();

  const addNewAnswerForComment = () => addNewAnswer?.(props.id, props.userName, props.commentId);

  return (
    <PostComment
      answersCount={answers?.length}
      answersSection={answers?.map((answer, index) => (
        <PrivatePostComment key={index} {...answer} />
      ))}
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
        <IconButton size={'small'}>
          {isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
        </IconButton>
      }
      {...props}
    />
  );
};
