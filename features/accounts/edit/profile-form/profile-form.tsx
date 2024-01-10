import React, { FC, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { DatePickerContainer } from '@/components/datePicker/datePickerContainer';
import { useProfileFormSchema } from '@/features/accounts/edit/profile-form/use-profile-form-schema';
import { Button } from '@/shared/ui';
import { SelectBox } from '@/shared/ui/SelectBox';
import { TextField } from '@/shared/ui/textField';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import style from './profile-form.module.scss';
import { AddProfilePhoto } from '..';
import { fetchCountries } from './fetch-countries';
import { countrySelectType, countryType, selectType } from './pofile-form-types';
import axios from 'axios';
import { useChangeUserProfileMutation } from '@/shared/api/user.api';

type FormValues = z.infer<ReturnType<typeof useProfileFormSchema>>;

export const ProfileForm: FC = () => {
  const schema = useProfileFormSchema();

  const { control, handleSubmit, watch, useWatch } = useForm<FormValues>({
    defaultValues: {
      aboutMe: '',
      birthDate: new DateObject().valueOf(),
      city: '',
      country: '',
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  // const defaultIdx = selectOptions.findIndex(item => item.value === locale);

  // const changeCountry = (value: string) => {
  //   // push(value);
  //   // console.log(value);
  // };

  // const changeCity = (value: string) => {
  //   // push(value);
  // };

  const [countries, setCountries] = useState<countryType[]>([]);
  const [country, setCountry] = useState<string>('');
  const [countriesOptions, setCountriesOptions] = useState<selectType[]>();
  const [citiesOptions, setCitiesOptions] = useState<selectType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get('https://countriesnow.space/api/v0.1/countries')
        .then(response => response.data.data);

      setCountries(data);

      const options = countries.map(
        (country: countryType): selectType => ({
          id: `${country.iso2 + country.country}`,
          label: country.country,
          value: country.country,
        })
      );

      setCountriesOptions(options);
    };

    fetchData();
  }, []);

  const getCitiesOfCountry = (event: string) => {
    const countryInfo: countryType = countries.find(c => c.country === event);

    const cities = countryInfo.cities.map((i, index) => ({
      id: `${index + i}`,
      label: i,
      value: i,
    }));

    setCitiesOptions(cities);
  };

  const [saveChanges] = useChangeUserProfileMutation();

  const onSubmit = (data: FormValues) => {
    // Use data.birthData.format() to bring the data to the format requested by the backend.

    console.log(data);
    saveChanges({ ...data, dateOfBirth: String(data.dateOfBirth) });
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form} id={'generalInformation'} onSubmit={handleSubmit(onSubmit)}>
        {process.env.NEXT_PUBLIC_MODE === 'development' && <DevTool control={control} />}

        <Controller
          control={control}
          name={'username'}
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
          name={'firstname'}
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
          name={'lastname'}
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
              render={({ field }) => (
                <SelectBox
                  {...field}
                  labelField={'Select your country'}
                  onChangeFn={event => {
                    // setCountry(event);
                    field.onChange(event);
                    getCitiesOfCountry(event);
                  }}
                  options={countriesOptions}
                  placeholder={'Country'}
                />
              )}
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
                  options={citiesOptions}
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
