import { LocaleType } from '@/locales/ru';
import { z } from 'zod';

export const signUpSchema = (t: LocaleType) =>
  z
    .object({
      checkbox: z.boolean(),
      confirm: z.string(),
      email: z.string().email({ message: t.auth.signUpPage.validationFormErrors.invalidEmail }),
      nickname: z
        .string()
        .min(6, { message: t.auth.signUpPage.validationFormErrors.minValueUsername })
        .max(30, { message: t.auth.signUpPage.validationFormErrors.maxValueUsername })
        .regex(/^[0-9A-Za-z_-]+$/),
      password: z
        .string()
        .min(6, { message: t.auth.signUpPage.validationFormErrors.minValuePassword })
        .max(20, { message: t.auth.signUpPage.validationFormErrors.maxValuePassword })
        .refine(
          value =>
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])/.test(value),
          t.auth.signUpPage.validationFormErrors.invalidPassword
        ),
    })
    .refine(data => data.password === data.confirm, {
      message: t.auth.signUpPage.validationFormErrors.secondPasswordError,
      path: ['confirm'],
    });

export type SignUpFormValues = z.infer<ReturnType<typeof signUpSchema>>;
