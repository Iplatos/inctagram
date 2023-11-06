import { Controller, useForm } from 'react-hook-form';

import { TextField } from '@/components/TextField/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  password: z.string().min(3),
});

type FormValuesType = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const onSubmit = data => console.log(data);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
  });

  return (
    /* eslint-disable */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        rules={
          { required: "required" }
        }
        render={({ field, fieldState }) => <TextField
          errors={fieldState?.error?.message}
          onChange={field.onChange}
          value={field.value}
          inputtype={"text"} />}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => <TextField onChange={field.onChange}
                                                      placeholder={"password"}
                                                      inputtype={"password"}
                                                      errors={fieldState?.error?.message}
                                                      label={"password"} {...field} />}
      />
      <input type={"submit"} />
    </form>
    /* eslint-enable */
  );
};
