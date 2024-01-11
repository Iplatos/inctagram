import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { DatePickerContainer } from '@/components/datePicker/datePickerContainer';
import { useProfileFormSchema } from '@/features/accounts/edit/profile-form/use-profile-form-schema';
import { SelectBox } from '@/shared/ui/SelectBox';
import { TextField } from '@/shared/ui/textField';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { z } from 'zod';

import style from './profile-form.module.scss';

import { CountriesApiResponse, CountryWithFlagApiData } from './pofile-form-types';

type FormValues = z.infer<ReturnType<typeof useProfileFormSchema>>;

const useCountries = () => {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get<CountriesApiResponse<CountryWithFlagApiData[]>>(
        'https://countriesnow.space/api/v0.1/countries/flag/unicode'
      )
      .then(({ data: response }) => setCountries(response.data.map(({ name }) => name)));
  }, []);

  return countries;
};

const useCities = (country: string) => {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (!country) {
      return;
    }

    axios
      .post<CountriesApiResponse<string[]>>(
        'https://countriesnow.space/api/v0.1/countries/cities',
        { country }
      )
      .then(({ data: response }) => setCities(response.data));
  }, [country]);

  return cities;
};

export const ProfileForm: FC = () => {
  const schema = useProfileFormSchema();

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
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

  const country = watch('country');

  const countries = useCountries();
  const cities = useCities(country);

  // IMPORTANT: It will not work. You need to configure the redux provider!
  // And don't forget to pass the userApi to redux's combineReducers API!
  // const [saveChanges] = useChangeUserProfileMutation();

  const onSubmit = (data: FormValues) => {
    // Use data.birthData.format() to bring the data to the format requested by the backend.
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form} id={'generalInformation'} onSubmit={handleSubmit(onSubmit)}>
        {process.env.NEXT_PUBLIC_MODE === 'development' && <DevTool control={control} />}

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
              render={({ field: { onChange } }) => {
                const handleChange = (country: string) => {
                  onChange(country);
                  // TODO: Find the optimal solution for resetting 'cities'
                  setValue('city', '');
                };

                return (
                  <SelectBox
                    labelField={'Select your country'}
                    onChangeFn={handleChange}
                    options={countries.map(c => ({ label: c, value: c }))}
                    placeholder={'Country'}
                  />
                );
              }}
            />
          </div>

          <div className={style.select}>
            <Controller
              control={control}
              name={'city'}
              render={({ field }) => (
                <SelectBox
                  labelField={'Select your city'}
                  onChangeFn={field.onChange}
                  options={cities.map(c => ({ label: c, value: c }))}
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
      </form>
    </div>
  );
};
