import React, { FC, useEffect, useState } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { DatePickerContainer } from '@/components/datePicker/datePickerContainer';
import { useProfileFormSchema } from '@/features/accounts/edit/profile-form/use-profile-form-schema';
import { useGetCitiesQuery, useGetCountriesQuery } from '@/shared/api/countries.api';
import { Button } from '@/shared/ui';
import { Combobox } from '@/shared/ui/combobox';
import { TextField } from '@/shared/ui/textField';
// import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import style from './profile-form.module.scss';
import { useChangeUserProfileMutation } from '@/shared/api/user.api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { OptionsType } from './pofile-form-types';
import { skipToken } from '@reduxjs/toolkit/query';

type FormValues = z.infer<ReturnType<typeof useProfileFormSchema>>;

export const ProfileForm: FC = props => {
  // const { onSubmitChanges, profile, username } = props;

  const schema = useProfileFormSchema();

  const { t } = useTranslation();

  const {
    control,
    formState: { dirtyFields, isValid },
    handleSubmit,
    setValue,
    watch,
    resetField,
  } = useForm<FormValues>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: new DateObject().valueOf(),
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  const [countriesOptions, setCountriesOptions] = useState<OptionsType[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<OptionsType[]>([]);

  // useEffect(() => {
  // setValue('country', '');

  // }, []);

  const selectedCountry = watch('country');

  const { data: countries } = useGetCountriesQuery();
  const { data: cities } = useGetCitiesQuery(selectedCountry || skipToken);

  // if (data !== undefined) {
  //   setCountriesOptions(data.data.map(({ name }) => ({ label: name, value: name })));
  // }

  // useEffect(() => {
  // if (selectedCountry) {
  // resetField('city', { defaultValue: '' });
  //   getCities(selectedCountry);
  // }

  // if (cities !== undefined) {
  //   setCitiesOptions(cities.data.map(name => ({ label: name, value: name })));
  // }
  // }, [selectedCountry, resetField]);

  const [saveChanges] = useChangeUserProfileMutation();

  const onSubmit: SubmitHandler<FormValues> = data => {
    // Use data.birthData.format() to bring the data to the format requested by the backend.
    console.log(data);
  };

  const onErrorSubmit: SubmitErrorHandler<FormValues> = data => {
    console.log(data);
  };

  const [inputValue, setInputValue] = useState('');

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
        {/* {process.env.NEXT_PUBLIC_MODE === 'development' && <DevTool control={control} />} */}
        <Controller
          control={control}
          name={'userName'}
          render={({ field, fieldState }) => (
            <TextField
              error={fieldState?.error?.message}
              inputType={'text'}
              label={'Username'}
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
        <Controller
          control={control}
          name={'dateOfBirth'}
          render={({ field: { onBlur, onChange, value }, fieldState }) => (
            // TODO: think about min and max dates
            // TODO: consider validating the input format by changing the input field manually
            // https://shahabyazdi.github.io/react-multi-date-picker/validation/#validating-input-value
            <DatePickerContainer
              error={fieldState?.error?.message}
              format={'DD.MM.YYYY'}
              label={'Date of birth'}
              onChange={date => {
                // Temporary solution until there is no logic to validate user manual input
                if (date instanceof DateObject) {
                  onChange(date.valueOf());
                } else {
                  onChange(new DateObject().valueOf());
                }
              }}
              onClose={onBlur}
              value={value}
            />
          )}
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
                  label={'Select your country'}
                  onChange={value => {
                    resetField('city');
                    field.onChange(value);
                  }}
                  onInputChange={setInputValue}
                  options={(countries?.data ?? []).map(({ name }) => ({
                    label: name,
                    value: name,
                  }))}
                  placeholder={'Country'}
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
                  label={'Select your city'}
                  onChange={field.onChange}
                  onInputChange={setInputValue}
                  options={(cities?.data ?? []).map(name => ({ label: name, value: name }))}
                  placeholder={'City'}
                  value={field.value}
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

        <div className={style.separator} role={'separator'}></div>

        <div className={style.saveButton}>
          <Button disabled={!isValid} type={'submit'} variant={'primary'}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
