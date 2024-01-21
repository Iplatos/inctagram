import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { DatePickerContainer } from '@/components/datePicker/datePickerContainer';
import { useProfileFormSchema } from '@/features/accounts/edit/profile-form/use-profile-form-schema';
import { useGetCitiesMutation, useGetCountriesQuery } from '@/shared/api/countries.api';
import { Button } from '@/shared/ui';
import { Combobox } from '@/shared/ui/combobox';
import { TextField } from '@/shared/ui/textField';
// import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import style from './profile-form.module.scss';

type FormValues = z.infer<ReturnType<typeof useProfileFormSchema>>;

// const useCountries = () => {
//   const [countries, setCountries] = useState<string[]>([]);

//   useEffect(() => {
//     axios
//       .get<CountriesApiResponse<CountryWithFlagApiData[]>>(
//         'https://countriesnow.space/api/v0.1/countries/flag/unicode'
//       )
//       .then(({ data: response }) => setCountries(response.data.map(({ name }) => name)));
//   }, []);

//   return countries;
// };

// const useCities = (country: string) => {
//   const [cities, setCities] = useState<string[]>([]);

//   useEffect(() => {
//     if (!country) {
//       return;
//     }

//     axios
//       .post<CountriesApiResponse<string[]>>(
//         'https://countriesnow.space/api/v0.1/countries/cities',
//         { country }
//       )
//       .then(({ data: response }) => setCities(response.data));
//   }, [country]);

//   return cities;
// };

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

  type OptionsType = {
    label: string;
    value: string;
  };

  const [countriesOptions, setCountriesOptions] = useState<OptionsType[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<OptionsType[]>([]);

  const { data } = useGetCountriesQuery();

  useEffect(() => {
    if (data !== undefined) {
      setCountriesOptions(data.data.map(({ name }) => ({ label: name, value: name })));
    }
  }, []);

  const [getCities, { data: cities }] = useGetCitiesMutation();

  console.log(cities);

  useEffect(() => {
    if (!country) {
      return;
    }

    getCities(country);

    if (cities !== undefined) {
      setCitiesOptions(cities.data.map(name => ({ label: name, value: name })));
    }
  }, [country]);

  // const [saveChanges] = useChangeUserProfileMutation();

  const onSubmit = (data: FormValues) => {
    // Use data.birthData.format() to bring the data to the format requested by the backend.
    // console.log(data);
  };

  const [inputValue, setInputValue] = useState('');

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
                  onChange={field.onChange}
                  onInputChange={setInputValue}
                  options={countriesOptions}
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
                  options={citiesOptions}
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
          <Button type={'submit'} variant={'primary'}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
