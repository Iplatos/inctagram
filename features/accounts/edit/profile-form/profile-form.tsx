import { FC, useState } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { useProfileFormSchema } from '@/features/accounts/edit/profile-form/use-profile-form-schema';
import { ProfileFormDatePicker } from '@/features/accounts/edit/profile-form-date-picker/ProfileFormDatePicker';
import { useGetCitiesQuery, useGetCountriesQuery } from '@/shared/api/countries.api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui';
import { Combobox } from '@/shared/ui/combobox';
import { ControlledTextField } from '@/shared/ui/controlled';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query';
import { z } from 'zod';

import style from './profile-form.module.scss';

export type FormValues = z.infer<ReturnType<typeof useProfileFormSchema>>;

type ProfileFormProps = {
  defaultValues?: (() => Promise<FormValues>) | FormValues;
  onSubmit: SubmitHandler<FormValues>;
  onSubmitError?: SubmitErrorHandler<FormValues>;
};

const getDefaultFormValues = (): FormValues => ({
  aboutMe: '',
  city: '',
  country: '',
  dateOfBirth: null,
  firstName: '',
  lastName: '',
  userName: '',
});

export const ProfileForm: FC<ProfileFormProps> = ({
  defaultValues = getDefaultFormValues(),
  onSubmit,
  onSubmitError,
}) => {
  const {
    t: { generalInformation: t },
  } = useTranslation();
  const schema = useProfileFormSchema();

  const [inputValue, setInputValue] = useState('');

  const { control, handleSubmit, resetField, watch } = useForm<FormValues>({
    defaultValues,
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  const selectedCountry = watch('country');

  const { data: countries } = useGetCountriesQuery();
  const { data: cities } = useGetCitiesQuery(selectedCountry || skipToken);

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit, onSubmitError)}>
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
                <Combobox
                  {...field}
                  errorMessage={fieldState?.error?.message}
                  inputValue={inputValue}
                  label={t.country.label}
                  onChange={value => {
                    resetField('city', { defaultValue: '' });
                    field.onChange(value);
                  }}
                  onInputChange={setInputValue}
                  options={(countries?.data ?? []).map(({ name }) => ({
                    label: name,
                    value: name,
                  }))}
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
                <Combobox
                  {...field}
                  errorMessage={fieldState?.error?.message}
                  inputValue={inputValue}
                  label={t.city.label}
                  onInputChange={setInputValue}
                  options={(cities?.data ?? []).map(name => ({ label: name, value: name }))}
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

        <div className={style.separator} role={'separator'} />

        <Button className={style.saveButton} type={'submit'} variant={'primary'}>
          {t.submitButton}
        </Button>
      </form>
    </div>
  );
};
