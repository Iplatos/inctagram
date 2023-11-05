import { Controller, useForm } from 'react-hook-form';

import { TextField } from '@/components/TextField/TextField';

interface IFormInputs {
  email: string;
  password: string;
}

export const ControlledTextField = () => {
  const { control, handleSubmit, register, setValue } = useForm<IFormInputs>({
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
        render={({ field }) => <TextField onChangeValue={field.onChange} inputType={"text"} {...field} />}
      />{" "}
      <Controller
        control={control}
        name="password"
        render={({ field }) => <TextField onChangeValue={field.onChange} placeholder={"password"} inputType={"password"}
                                          label={"password"} {...field} />}
      />
      <input type={"submit"} />
    </form>
    /* eslint-enable */
  );
};
