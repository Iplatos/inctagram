import React, { ComponentPropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';

//import { useTranslation } from '@/shared/hooks/useTranslation';
import { Nullable } from '@/shared/types/helpers';
import { Button, Typography } from '@/shared/ui';
import { ControlledTextArea } from '@/shared/ui/controlled';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { z } from 'zod';

import s from './edit-post-form.module.scss';

const editPostSchema = z.object({
  description: z.string().max(500, { message: 'Maximum number of characters 500' }),
});

export type EditPostFormValues = z.infer<typeof editPostSchema>;

type EditPostFormProps = {
  classNameSubmit?: string;
  currentDescription?: Nullable<string>;
  disabled?: boolean;
  onSubmit: (data: EditPostFormValues) => void;
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

  const {
    control,
    formState: { errors, isSubmitting, isValid, submitCount },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      description: currentDescription || '',
    },
    resolver: zodResolver(editPostSchema),
  });

  const onSubmitHandler = (data: EditPostFormValues) => onSubmit(data);

  const submitIsDisabled = (!isValid && !!submitCount) || isSubmitting;

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmitHandler)} {...rest}>
      <div className={s.area}>
        <ControlledTextArea
          error={errors.description?.message}
          classNameTextArea={s.area__textarea}
          control={control}
          name={'description'}
          disabled={isSubmitting}
          label={'Add publication descriptions'}
          placeholder={'Text-area'}
          resize="none"
          rows={3}
        />
        <Typography.SmallLink className={s.valueLength}>{`${
          watch('description').length
        }/500`}</Typography.SmallLink>
      </div>
      <Button className={clsx(s.btn, classNameSubmit)} disabled={submitIsDisabled} type={'submit'} variant={'text'}>
        {titleSubmit || 'Save changes'}
      </Button>
    </form>
  );
};
