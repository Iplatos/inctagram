import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { TextField } from '@/components/TextField/TextField';

type FormValues = {
  email: string;
  password: string;
};
export const ControlledTextField = () => {
  const {
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={'email'}
        render={({ field }) => <TextField inputType={'text'} {...field} />}
        rules={{ required: true }}
      />
      <Controller
        control={control}
        name={'password'}
        render={({ field }) => <TextField inputType={'password'} label={'sa'} {...field} />}
        rules={{ required: true }}
      />
      <input type={'submit'} />
    </form>
  );
};
