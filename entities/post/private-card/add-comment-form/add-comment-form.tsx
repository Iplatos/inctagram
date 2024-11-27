import { ElementRef, ElementType, FC, Ref, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useTranslation } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { ControlledTextField } from '@/shared/ui/controlled';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { z } from 'zod';

import s from './add-comment-form.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

const DevTool: ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

export type AddPostCommentFormProps = {
  disabled?: boolean;

  formRef?: Ref<ElementRef<'form'>>;
  onSubmit: SubmitHandler<FormValues>;
  textLimit?: number;
};

type FormValues = z.infer<ReturnType<typeof getAddPostCommentFormSchema>>;

const getAddPostCommentFormSchema = (max: number, message: string) =>
  z.object({ comment: z.string().max(max, { message }) });

export const AddPostCommentForm: FC<AddPostCommentFormProps> = ({
  disabled,
  formRef,
  onSubmit,
  textLimit = 150,
}) => {
  const t = useTranslation().t.post.card.addNewComment;

  const addPostCommentSchema = getAddPostCommentFormSchema(textLimit, t.error);

  const {
    control,
    formState: { isDirty, isSubmitSuccessful, isSubmitting, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { comment: '' },
    mode: 'onChange',
    resolver: zodResolver(addPostCommentSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <>
      {process.env.NEXT_PUBLIC_MODE === 'development' && (
        <DevTool
          control={control}
          styles={{ panel: { height: '70vh', overflow: 'auto', top: 50 } }}
        />
      )}
      <form className={s.root} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <ControlledTextField
          classes={{ container: s.textFieldContainer, input: s.textFieldInput }}
          control={control}
          disabled={isSubmitting || disabled}
          name={'comment'}
          placeholder={t.placeholder}
        />
        <Button
          className={modalCardS.headerIconButtonLast}
          disabled={isSubmitDisabled || disabled}
          type={'submit'}
          variant={'text'}
        >
          {t.submit}
        </Button>
      </form>
    </>
  );
};
