import { Controller, useForm } from 'react-hook-form';

import { useLoginMutation } from '@/pages/api/auth.service';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import { TextField } from '@/shared/ui/textField/TextField';
import { createTypography } from '@/shared/ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import s from 'components/auth/sign-in-form/sign-in-form.module.scss';

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  password: z.string().min(3),
});

type FormValuesType = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const [login] = useLoginMutation();

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
    <Card className={s.signInFormContainer}>
      <createTypography>hello</createTypography>
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
            label={"email"}
            inputtype={"text"} />}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => <TextField
            onChange={field.onChange}
            placeholder={"password"}
            inputtype={"password"}
            errors={fieldState?.error?.message}
            label={"password"} {...field} />}
        />
        <Button type={"submit"}>Sign In</Button>
      </form>
    </Card>
    /* eslint-enable */
  );
};
