import React, { ComponentPropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { Nullable } from '@/shared/types/helpers';
import { Button, Typography } from '@/shared/ui';
import { ControlledTextField } from '@/shared/ui/controlled';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { z } from 'zod';

import s from './edit-post-form.module.scss';

type EditPostFormProps = {
  classNameSubmit?: string;
  currentDescription?: Nullable<string>;
  disabled?: boolean;
  onSubmit: (data: any) => void;
  titleSubmit?: string;
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>;

export const EditPostForm = (props: EditPostFormProps) => {
  const {
    className,
    classNameSubmit,
    currentDescription,
    disabled,
    onSubmit,
    titleSubmit,
    ...rest
  } = props;
  const { t } = useTranslation();

  const editPostSchema = z.object({
    description: z.string().max(500, {
      message:
        useTranslation().t.myProfile.addPostModal.postDescriptionCard.postDescription.errors.tooBig,
    }),
  });

  const {
    control,
    formState: { isSubmitting, isValid, submitCount },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      description: currentDescription || '',
    },
    resolver: zodResolver(editPostSchema),
  });

  type EditPostFormValues = z.infer<typeof editPostSchema>;
  const onSubmitHandler = (data: EditPostFormValues) => {
    onSubmit(data);
  };

  const submitIsDisabled = (!isValid && !!submitCount) || isSubmitting;

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmitHandler)} {...rest}>
      <div className={s.area}>
        <ControlledTextField
          as={'textarea'}
          className={s.area__textarea}
          control={control}
          disabled={isSubmitting}
          label={t.myProfile.addPostModal.postDescriptionCard.postDescription.label}
          name={'description'}
          placeholder={t.myProfile.addPostModal.postDescriptionCard.postDescription.placeholder}
        />
        <Typography.SmallLink className={s.valueLength}>
          {`${watch('description') === undefined ? 0 : watch('description').length}/500`}
        </Typography.SmallLink>
      </div>
      <Button
        className={clsx(s.btn, classNameSubmit)}
        disabled={submitIsDisabled}
        type={'submit'}
        variant={'text'}
      >
        {titleSubmit || 'Save changes'}
      </Button>
    </form>
  );
};
