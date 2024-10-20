import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { Nullable } from '@/shared/types/helpers';
import { Typography } from '@/shared/ui';
import { ControlledTextField } from '@/shared/ui/controlled';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { z } from 'zod';

import s from './edit-post-form.module.scss';

type EditPostFormProps = {
  actions?: ReactNode;
  classNameActions?: string;
  currentDescription?: Nullable<string>;
  disabled?: boolean;
  onBlurHandler: (data: { description: string }) => void;
  onSubmit: (data: any) => void;
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>;

export const EditPostForm = forwardRef<HTMLFormElement, EditPostFormProps>(
  (props: EditPostFormProps, ref) => {
    const {
      actions,
      className,
      classNameActions,
      currentDescription,
      disabled,
      onBlurHandler,
      onSubmit,
      ...rest
    } = props;
    const { t } = useTranslation();

    const editPostSchema = z.object({
      description: z.string().max(500, {
        message:
          useTranslation().t.myProfile.addPostModal.postDescriptionCard.postDescription.errors
            .tooBig,
      }),
    });

    const {
      control,
      formState: { isSubmitting },
      handleSubmit,
      register,
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

    const onBlur = () => {
      const currentData = watch();

      onBlurHandler({ description: currentData.description });
    };

    return (
      <form
        className={clsx(s.form, className)}
        onSubmit={handleSubmit(onSubmitHandler)}
        ref={ref}
        {...rest}
      >
        <div className={s.area}>
          <ControlledTextField
            as={'textarea'}
            className={s.area__textarea}
            control={control}
            disabled={isSubmitting}
            label={t.myProfile.addPostModal.postDescriptionCard.postDescription.label}
            placeholder={t.myProfile.addPostModal.postDescriptionCard.postDescription.placeholder}
            {...register('description', { onBlur })}
          />
          <Typography.SmallLink className={s.valueLength}>
            {`${watch('description') === undefined ? 0 : watch('description').length}/500`}
          </Typography.SmallLink>
          <div className={classNameActions}>{actions}</div>
        </div>
      </form>
    );
  }
);
