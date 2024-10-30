import { ElementType, FC } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { Button, TextFieldProps } from '@/shared/ui';
import { ControlledTextField } from '@/shared/ui/controlled';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { z } from 'zod';

import s from './add-post-comment-form.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

const DevTool: ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

type AddPostCommentFormProps = {
  className?: string;
  disabled?: boolean;

  onSubmit: SubmitHandler<FormValues>;
  onSubmitError?: SubmitErrorHandler<FormValues>;
  submitButtonTitle?: string;
  textFieldProps?: Pick<TextFieldProps, 'error' | 'placeholder'>;
  textLimit?: number;
};

type FormValues = z.infer<ReturnType<typeof getAddPostCommentFormSchema>>;

const defaultTextFieldProps = {
  error: 'Maximum number of characters 150',
  placeholder: 'Add a Comment...',
} satisfies AddPostCommentFormProps['textFieldProps'];

const getAddPostCommentFormSchema = (max: number, message: string) =>
  z.object({ comment: z.string().max(max, { message }) });

export const AddPostCommentForm: FC<AddPostCommentFormProps> = ({
  className,
  disabled,
  onSubmit,
  onSubmitError,
  submitButtonTitle = 'Publish',
  textFieldProps,
  textLimit = 150,
}) => {
  const resolvedTextFieldProps = { ...defaultTextFieldProps, ...textFieldProps };
  const addPostCommentSchema = getAddPostCommentFormSchema(textLimit, resolvedTextFieldProps.error);

  const {
    control,
    formState: { isDirty, isSubmitting, isValid, submitCount },
    handleSubmit,
  } = useForm({
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(addPostCommentSchema),
  });

  const isSubmitDisabled = !isDirty || (!isValid && !!submitCount) || isSubmitting;

  return (
    <>
      {process.env.NEXT_PUBLIC_MODE === 'development' && (
        <DevTool
          control={control}
          styles={{ panel: { height: '70vh', overflow: 'auto', top: 50 } }}
        />
      )}
      <form className={clsx(s.root, className)} onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <ControlledTextField
          classes={{ container: s.textFieldContainer, input: s.textFieldInput }}
          control={control}
          disabled={isSubmitting || disabled}
          name={'comment'}
          placeholder={resolvedTextFieldProps.placeholder}
        />
        <Button
          className={modalCardS.headerIconButtonLast}
          disabled={isSubmitDisabled || disabled}
          type={'submit'}
          variant={'text'}
        >
          {submitButtonTitle}
        </Button>
      </form>
    </>
  );
};
