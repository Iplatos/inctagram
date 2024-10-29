import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef, useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { PropsWithoutChildren, Replace } from '@/shared/types/helpers';
import { TextFieldProps, Typography } from '@/shared/ui';
import { ControlledTextField } from '@/shared/ui/controlled';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import { z } from 'zod';

import s from './edit-post-form.module.scss';

const DevTool: ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

export type EditPostFormProps = Replace<
  PropsWithoutChildren<ComponentPropsWithoutRef<'form'>>,
  {
    description?: string;
    disabled?: boolean;
    onBlur?: (data: FormValues) => void;
    onSubmit: SubmitHandler<FormValues>;
    onSubmitError?: SubmitErrorHandler<FormValues>;
    textFieldProps?: Pick<TextFieldProps, 'error' | 'label' | 'placeholder'>;
    textLimit?: number;
  }
>;

type FormValues = z.infer<ReturnType<typeof getEditPostFormSchema>>;

const defaultTextFieldProps = {
  error: 'Maximum number of characters 500',
  label: 'Add publication description',
  placeholder: 'Description...',
} satisfies EditPostFormProps['textFieldProps'];

const getEditPostFormSchema = (max: number, message: string) =>
  z.object({ description: z.string().max(max, { message }) });

export const EditPostForm = forwardRef<HTMLFormElement, EditPostFormProps>(
  (
    {
      className,
      description: initialDescription = '',
      disabled,
      onBlur,
      onSubmit,
      onSubmitError,
      textFieldProps,
      textLimit = 500,
      ...rest
    },
    ref
  ) => {
    const resolvedTextFieldProps = { ...defaultTextFieldProps, ...textFieldProps };
    const editPostSchema = getEditPostFormSchema(textLimit, resolvedTextFieldProps.error);

    const {
      control,
      formState: { isSubmitSuccessful, isSubmitting },
      handleSubmit,
      reset,
      trigger,
      watch,
    } = useForm<FormValues>({
      defaultValues: { description: initialDescription },
      mode: 'onChange',
      resolver: zodResolver(editPostSchema),
    });

    // Initiate a validation when the component is mounted to immediately generate an error
    //  if `description.length` >= `textLimit`
    useEffect(() => {
      trigger('description');
    }, [trigger]);

    // reset `defaultValues` of `useForm` to the value from props
    //  to preserve the `useForm` as the only source of truth
    useEffect(() => {
      if (isSubmitSuccessful) {
        reset({ description: initialDescription });
      }
    }, [isSubmitSuccessful, reset, initialDescription]);

    const description = watch('description', initialDescription);

    return (
      <>
        {process.env.NEXT_PUBLIC_MODE === 'development' && (
          <DevTool
            control={control}
            styles={{ panel: { height: '70vh', overflow: 'auto', top: 50 } }}
          />
        )}
        <form
          className={clsx(s.form, className)}
          onBlur={() => onBlur?.({ description })}
          onSubmit={handleSubmit(onSubmit, onSubmitError)}
          ref={ref}
          {...rest}
        >
          <ControlledTextField
            as={'textarea'}
            className={s.field}
            control={control}
            disabled={isSubmitting || disabled}
            label={resolvedTextFieldProps.label}
            name={'description'}
            placeholder={resolvedTextFieldProps.placeholder}
          />
          <Typography.Regular12 className={s.charsCounter}>
            {`${description.length}/${textLimit}`}
          </Typography.Regular12>
        </form>
      </>
    );
  }
);
