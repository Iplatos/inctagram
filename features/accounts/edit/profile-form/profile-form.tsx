import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { SelectBox } from '@/shared/ui/SelectBox';
import { TextField } from '@/shared/ui/textField';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import style from './profile-form.module.scss';

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

  const selectOptions = [
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
    { label: 'french', value: 'france' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
  ];

  // const defaultIdx = selectOptions.findIndex(item => item.value === locale);

  const changeCountry = (value: string) => {
    // push(value);

    console.log(value);
  };

  const changeCity = (value: string) => {
    // push(value);
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

        <Controller
          control={control}
          name={'firstname'}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              errors={fieldState?.error?.message}
              inputtype={'text'}
              label={'First Name'}
              onChange={field.onChange}
              onFocus={() => clearErrors('firstname')}
              placeholder={''}
              required
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name={'lastname'}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              errors={fieldState?.error?.message}
              inputtype={'text'}
              label={'Last Name'}
              onChange={field.onChange}
              onFocus={() => clearErrors('lastname')}
              placeholder={''}
              required
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name={'dateofbirth'}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              errors={fieldState?.error?.message}
              inputtype={'text'}
              label={'Date of birth'}
              onChange={field.onChange}
              onFocus={() => clearErrors('dateofbirth')}
              placeholder={'00.00.00'}
              value={field.value}
            />
          )}
        />

        <div className={style.selectBlock}>
          <div className={style.select}>
            <Controller
              control={control}
              name={'country'}
              render={({ field, fieldState }) => (
                <SelectBox
                  labelField={'Country'}
                  onChangeFn={changeCountry}
                  options={selectOptions}
                  placeholder={'Country'}
                />
              )}
            />
          </div>
          <div className={style.select}>
            <Controller
              control={control}
              name={'city'}
              render={({ field, fieldState }) => (
                <SelectBox
                  labelField={'City'}
                  onChangeFn={changeCity}
                  options={selectOptions}
                  placeholder={'City'}
                />
              )}
            />
          </div>
        </div>

        <Controller
          control={control}
          name={'aboutme'}
          render={({ field, fieldState }) => (
            <TextField
              as={'textarea'}
              {...field}
              errors={fieldState?.error?.message}
              inputtype={'text'}
              label={'About me'}
              onChange={field.onChange}
              onFocus={() => clearErrors('aboutme')}
              placeholder={''}
              value={field.value}
            />
          )}
        />
      </form>
    </div>
  );
};
