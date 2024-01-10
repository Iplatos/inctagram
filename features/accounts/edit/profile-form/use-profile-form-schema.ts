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
    dateOfBirth: z.number().refine(timestamp => {
      const minDate = new DateObject()
        .set({ hour: 0, millisecond: 0, minute: 0, second: 0 })
        .subtract(13, 'years');

      return timestamp <= minDate.valueOf();
    }),
    firstname: getNameFieldSchema({ field: 'First Name' }),
    lastname: getNameFieldSchema({ field: 'Last Name' }),
    username: getFieldSchema({
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
