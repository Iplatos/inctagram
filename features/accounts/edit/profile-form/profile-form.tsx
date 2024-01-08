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
import { countrySelectType, countryType } from './pofile-form-types';

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

  const onSubmit = (data: FormValues) => {
    // Use data.birthData.format() to bring the data to the format requested by the backend.
    ////data

    console.log(data);
  };

  // const defaultIdx = selectOptions.findIndex(item => item.value === locale);

  // const changeCountry = (value: string) => {
  //   // push(value);
  //   // console.log(value);
  // };

  // const changeCity = (value: string) => {
  //   // push(value);
  // };

  const [countries, setCountries] = useState<countrySelectType[]>([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCountries();

      await setCountries(
        data.map(
          (country: countryType): countrySelectType => ({
            id: `${country.iso2}${country.iso3}`,
            label: country.country,
            value: country.country,
          })
        )
      );

      // const cities = await data.find((c: countryType): any => c.country === country);
    };

    fetchData();
  }, []);

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

        <Controller
          control={control}
          name={'birthDate'}
          render={({ field: { onBlur, onChange, value }, fieldState }) => (
            // TODO: think about min and max dates
            // TODO: consider validating the input format by changing the input field manually
            // https://shahabyazdi.github.io/react-multi-date-picker/validation/#validating-input-value
            <DatePickerContainer
              error={fieldState?.error?.message}
              format={'DD.MM.YYYY'}
              label={'Birth Date'}
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
                  labelField={'Country'}
                  onChangeFn={field.onChange}
                  options={countries}
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
                  labelField={'City'}
                  onChangeFn={field.onChange}
                  // options={}
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
        {/* <Button type={'submit'}>Save Changes</Button> */}
      </form>
    </div>
  );
};
