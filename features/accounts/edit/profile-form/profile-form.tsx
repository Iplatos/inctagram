import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useProfileFormSchema } from '@/features/accounts/edit/profile-form/use-profile-form-schema';
import { ProfileFormDatePicker } from '@/features/accounts/edit/profile-form-date-picker/ProfileFormDatePicker';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui';
import { SelectBox } from '@/shared/ui/SelectBox';
import { ControlledTextField } from '@/shared/ui/controlled';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import style from './profile-form.module.scss';

type FormValues = z.infer<ReturnType<typeof useProfileFormSchema>>;

export const ProfileForm: FC = () => {
  const {
    t: { generalInformation: t },
  } = useTranslation();
  const schema = useProfileFormSchema();

  const { control, handleSubmit, resetField } = useForm<FormValues>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: new Date(),
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {};

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
        <ControlledTextField
          control={control}
          label={t.userName.label}
          name={'userName'}
          required
        />
        <ControlledTextField
          control={control}
          label={t.firstName.label}
          name={'firstName'}
          required
        />
        <ControlledTextField
          control={control}
          label={t.lastName.label}
          name={'lastName'}
          required
        />
        <ProfileFormDatePicker
          control={control}
          label={t.dateOfBirth.label}
          name={'dateOfBirth'}
          resetField={resetField}
        />
        <div className={style.selectBlock}>
          <div className={style.select}>
            <Controller
              control={control}
              name={'country'}
              render={({ field, fieldState }) => (
                <SelectBox
                  labelField={t.country.label}
                  onChangeFn={changeCountry}
                  options={selectOptions}
                  placeholder={t.country.placeholder}
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
                  labelField={t.city.label}
                  onChangeFn={changeCity}
                  options={selectOptions}
                  placeholder={t.city.placeholder}
                />
              )}
            />
          </div>
        </div>
        <ControlledTextField
          as={'textarea'}
          control={control}
          label={'About Me'}
          name={'aboutMe'}
        />
        {/*// TODO: Consider disabling the submit button if the form is invalid */}
        <Button type={'submit'}>{t.submitButton}</Button>
      </form>
    </div>
  );
};
