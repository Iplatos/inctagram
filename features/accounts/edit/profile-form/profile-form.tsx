import React, { useState } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { useProfileFormSchema } from '@/features/accounts/edit/profile-form/use-profile-form-schema';
import { ProfileFormDatePicker } from '@/features/accounts/edit/profile-form-date-picker/ProfileFormDatePicker';
import { useGetCitiesQuery, useGetCountriesQuery } from '@/shared/api/countries.api';
import { useLazyGetUserProfileQuery } from '@/shared/api/user.api';
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
  onSubmit: SubmitHandler<FormValues>;
  onSubmitError: SubmitErrorHandler<FormValues>;
};

export const ProfileForm = (props: ProfileFormProps) => {
  const { onSubmit, onSubmitError } = props;

  const {
    t: { generalInformation: t },
  } = useTranslation();
  const schema = useProfileFormSchema();

  const { control, handleSubmit, resetField, watch } = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await trigger();

      console.log(data);

      const mappedData = {
        ...data,
        lastName: data?.familyName,
        userName: data?.firstName,
      };

      const formFields: (keyof FormValues)[] = [
        'aboutMe',
        'city',
        'country',
        'dateOfBirth',
        'firstName',
        'lastName',
        'userName',
      ];

      return formFields.reduce((defaultValue, field) => {
        if (field === 'dateOfBirth') {
          defaultValue[field] = mappedData?.[field]?.length
            ? new Date(mappedData[field] as string)
            : null;
        } else {
          defaultValue[field] = mappedData?.[field] ?? '';
        }

        return defaultValue;
      }, {} as FormValues);
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  const [inputValue, setInputValue] = useState('');

  const selectedCountry = watch('country');

  const { data: countries } = useGetCountriesQuery();
  const { data: cities } = useGetCitiesQuery(selectedCountry || skipToken);

  const [trigger] = useLazyGetUserProfileQuery();

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
                    resetField('city');
                    field.onChange(value);
                  }}
                  onInputChange={setInputValue}
                  options={(countries?.data ?? []).map(({ name }) => ({
                    label: name,
                    value: name,
                  }))}
                  placeholder={t.country.placeholder}
                  value={field.value}
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
                  onChange={field.onChange}
                  onInputChange={setInputValue}
                  options={(cities?.data ?? []).map(name => ({ label: name, value: name }))}
                  placeholder={t.city.placeholder}
                  ref={field.ref}
                  value={field.value}
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

        <div className={style.separator} role={'separator'}></div>

        <div className={style.saveButton}>
          <Button type={'submit'} variant={'primary'}>
            {t.submitButton}
          </Button>
        </div>
      </form>
    </div>
  );
};
