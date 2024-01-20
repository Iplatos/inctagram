import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { ControlledDatePicker } from '@/components/controlled-date-picker/ControlledDatePicker';
import { useProfileFormSchema } from '@/features/accounts/edit/profile-form/use-profile-form-schema';
import { Button } from '@/shared/ui';
import { SelectBox } from '@/shared/ui/SelectBox';
import { TextField } from '@/shared/ui/textField';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import style from './profile-form.module.scss';

type FormValues = z.infer<ReturnType<typeof useProfileFormSchema>>;

export const ProfileForm: FC = () => {
  const schema = useProfileFormSchema();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      aboutMe: '',
      birthDate: new DateObject().toDate(),
      city: '',
      country: '',
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    const day = String(data.birthDate.getDate()).padStart(2, '0');
    const month = String(data.birthDate.getMonth() + 1).padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
    const year = data.birthDate.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    console.log({ ...data, birthDate: formattedDate });
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
  };

  const changeCity = (value: string) => {
    // push(value);
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        {process.env.NEXT_PUBLIC_MODE === 'development' && <DevTool control={control} />}
        <Controller
          control={control}
          name={'userName'}
          render={({ field, fieldState }) => (
            <TextField
              error={fieldState?.error?.message}
              inputType={'text'}
              label={'User Name'}
              required
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name={'firstName'}
          render={({ field, fieldState }) => (
            <TextField
              error={fieldState?.error?.message}
              label={'First Name'}
              required
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name={'lastName'}
          render={({ field, fieldState }) => (
            <TextField error={fieldState?.error?.message} label={'Last Name'} required {...field} />
          )}
        />
        {/*  <Controller
          control={control}
          name={'birthDate'}
          render={({ field: { onBlur, onChange, value }, fieldState }) => (
            <DatePickerContainer
              error={fieldState?.error?.message}
              label={'Date of birth'}
              onChange={(date, { input, validatedValue }) => {
                if (!validatedValue) {
                  onChange(new Date(1911212121212, 0, 1));
                }
                if (date instanceof DateObject) {
                  onChange(date.toDate());
                }
              }}
              onClose={onBlur}
              value={value}
            />
          )}
        />*/}
        <ControlledDatePicker control={control} errors={errors} name={'birthDate'} />
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
          name={'aboutMe'}
          render={({ field, fieldState }) => (
            <TextField
              as={'textarea'}
              error={fieldState?.error?.message}
              label={'About Me'}
              {...field}
            />
          )}
        />
        {/*// TODO: Consider disabling the submit button if the form is invalid */}
        <Button type={'submit'}>Save Changes</Button>
      </form>
    </div>
  );
};
