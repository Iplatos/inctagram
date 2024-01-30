import { useMemo } from 'react';
import { DateObject } from 'react-multi-date-picker';

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
    city: z.string(),
    country: z.string(),
    dateOfBirth: z
      .date()
      .nullable()
      // It is assumed that 'null' is a valid value because the 'dateOfBirth' field is optional.
      .refine(date => {
        if (date) {
          return date >= new Date(1900, 0, 1);
        }

        return true;
      }, 'Дата рождения не может быть раньше 1900 года')
      .refine(date => {
        if (date) {
          return date.valueOf() <= new DateObject().subtract(13, 'years').valueOf();
        }

        return true;
      }, 'Вы слишком молоды для этого сайта'),
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
