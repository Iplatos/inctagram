import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { DatePickerContainer } from '@/components/datePicker/datePickerContainer';
import { useProfileFormSchema } from '@/features/accounts/edit/profile-form/use-profile-form-schema';
import { Button } from '@/shared/ui';
import { SelectBox } from '@/shared/ui/SelectBox';
import { ControlledTextField } from '@/shared/ui/controlled';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import style from './profile-form.module.scss';

type FormValues = z.infer<ReturnType<typeof useProfileFormSchema>>;

export const ProfileForm: FC = () => {
  const schema = useProfileFormSchema();

  const { control, handleSubmit } = useForm<FormValues>({
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
        {process.env.NEXT_PUBLIC_MODE === 'development' && <DevTool control={control} />}
        <ControlledTextField control={control} label={'User Name'} name={'userName'} required />
        <ControlledTextField control={control} label={'First Name'} name={'firstName'} required />
        <ControlledTextField control={control} label={'Last Name'} name={'lastName'} required />

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
        <ControlledTextField
          as={'textarea'}
          control={control}
          label={'About Me'}
          name={'aboutMe'}
        />

        {/*// TODO: Consider disabling the submit button if the form is invalid */}
        <Button type={'submit'}>Save Changes</Button>
      </form>
    </div>
  );
};
