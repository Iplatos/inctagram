import { Controller, useForm } from 'react-hook-form';

import { TextField } from '@/components/TextField/TextField';

interface IFormInputs {
  email: string;
  password: string;
}

export const ControlledTextField = () => {
  const { control, handleSubmit } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => console.log(data);

  return (
    /* eslint-disable */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => <TextField {...field} />}
      />{" "}
      <Controller
        control={control}
        name="password"
        render={({ field }) => <TextField {...field} />}
      />
      /* eslint-enable */
      <input type={"submit"} />
    </form>
  );
};

/*
const [login, { error }] = useLoginMutation();

const {
  formState: { errors },
} = useForm();
const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

const { control, handleSubmit } = useForm<FormValues>({
  defaultValues: {
    FirstName: '',
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
    <TextField inputType={'password'} label={'sa'} />
    <input control={control} name={'FirstName'} />
    <input type={'submit'} />
  </form>*/
