import { useMemo } from 'react';

import { LocaleType } from '@/locales/ru';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { z } from 'zod';

type FieldSchemaOptions = {
  field: string;
  max?: number;
  min?: number;
  regex?: {
    message?: string;
    value: RegExp;
  };
  required?: boolean;
};

export const useProfileFormSchema = () => {
  // TODO: add description of errors in locale objects in Russian and English languages
  const { t } = useTranslation();

  return useMemo(() => getValidationSchema(t), [t]);
};
const currentDate = new Date();
const minDate = new Date(1900, 0, 1);
const maxDate = new Date(
  currentDate.getFullYear() - 13,
  currentDate.getMonth(),
  currentDate.getDate()
);
const getValidationSchema = (locale: LocaleType) => {
  const getFieldSchema = ({ field, max, min, regex, required }: FieldSchemaOptions) => {
    let schema = z.string().trim();

    if (required) {
      schema = schema.min(1, `${field} is required`);
    }
    if (min) {
      schema = schema.min(min, `${field} must contain at least ${min} characters`);
    }
    if (max) {
      schema = schema.max(max, `${field} must contain at most ${max} characters`);
    }
    if (regex) {
      schema = schema.regex(regex.value, regex.message);
    }

    return schema;
  };

  const getNameFieldSchema = (
    options: Omit<FieldSchemaOptions, 'max' | 'min' | 'regex' | 'required'>
  ) =>
    getFieldSchema({
      max: 50,
      regex: {
        message: `${options.field} must contain only letters`,
        value: /^[a-zа-я]+$/i,
      },
      required: true,
      ...options,
    });

  return z.object({
    aboutMe: getFieldSchema({ field: 'About Me', max: 200 }),
    birthDate: z
      .date()
      .min(minDate, 'Дата рождения не может быть раньше 1900 года')
      .max(maxDate, 'Дата рождения не может быть позже 13 лет назад'),
    city: z.string(),
    country: z.string(),
    firstName: getNameFieldSchema({ field: 'First Name' }),
    lastName: getNameFieldSchema({ field: 'Last Name' }),
    userName: getFieldSchema({
      field: 'User Name',
      max: 30,
      min: 6,
      regex: {
        message: 'User Name must contain only letters, numbers, underscores or hyphens',
        value: /^[\wа-я-]+$/i,
      },
      required: true,
    }),
  });
};
