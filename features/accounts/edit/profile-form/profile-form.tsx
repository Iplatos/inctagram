import React from 'react';

import style from './profile-form.module.scss';

import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/shared/ui';

const schema = z.object({
  aboutme: z.string(),
  city: z.string(),
  country: z.string(),
  dateofbirth: z.date(),
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  // .min(6, { message: 'Minimum number of characters 6' })
  // .max(30, { message: 'Maximum number of characters 30' })
  // .regex(/^[0-9A-Za-z_-]+$/),
});

type FormValuesType = z.input<typeof schema>;

export const ProfileForm = () => {
  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValuesType>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValuesType) => {
    ////data
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={'username'}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              errors={fieldState?.error?.message}
              inputtype={'text'}
              label={'Username'}
              onChange={field.onChange}
              onFocus={() => clearErrors('username')}
              placeholder={''}
              required
              value={field.value}
            />
          )}
        />
      </form>
    </div>
  );
};
