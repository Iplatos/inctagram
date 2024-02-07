import { useMemo } from 'react';
import { DateObject } from 'react-multi-date-picker';

import { LocaleType } from '@/locales/ru';
import { TaggedStringMappers, transformTaggedString } from '@/shared/helpers/transformTaggedString';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { z } from 'zod';

type FieldSchemaOptions = {
  field: string;
  max?: number;
  min?: number;
  regex?: {
    message: string;
    value: RegExp;
  };
  required?: boolean;
};

const { interpolate } = transformTaggedString;

export const useProfileFormSchema = () => {
  const { t } = useTranslation();

  return useMemo(() => getValidationSchema(t), [t]);
};

const getCommonMappers = ({
  field,
  max,
  min,
}: FieldSchemaOptions): TaggedStringMappers<string> => ({
  field: () => field,
  max: () => String(max),
  min: () => String(min),
});

const getValidationSchema = (locale: LocaleType) => {
  const {
    generalInformation: { commonFieldErrors, ...t },
  } = locale;

  const getFieldSchema = ({ field, max, min, regex, required }: FieldSchemaOptions) => {
    let schema = z.string().trim();
    const commonMappers = getCommonMappers({ field, max, min });

    if (required) {
      schema = schema.min(1, interpolate(commonFieldErrors.required, commonMappers));
    }
    if (min) {
      schema = schema.min(min, interpolate(commonFieldErrors.min, commonMappers));
    }
    if (max) {
      schema = schema.max(max, interpolate(commonFieldErrors.max, commonMappers));
    }
    if (regex) {
      schema = schema.regex(regex.value, interpolate(regex.message, commonMappers));
    }

    return schema;
  };

  const getNameFieldSchema = ({ field }: { field: string }) => {
    return getFieldSchema({
      field,
      max: 50,
      regex: {
        message: commonFieldErrors.onlyLetters,
        value: /^[a-zа-я]+$/i,
      },
      required: true,
    });
  };

  return z.object({
    aboutMe: getFieldSchema({ field: t.aboutMe.label, max: 200 }),
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
      }, t.dateOfBirth.errors.under1900)
      .refine(date => {
        if (date) {
          return date.valueOf() <= new DateObject().subtract(13, 'years').valueOf();
        }

        return true;
      }, t.dateOfBirth.errors.toYoung),
    firstName: getNameFieldSchema({ field: t.firstName.label }),
    lastName: getNameFieldSchema({ field: t.lastName.label }),
    userName: getFieldSchema({
      field: t.userName.label,
      max: 30,
      min: 6,
      regex: {
        message: t.userName.errors.regexp,
        value: /^[\wа-я-]+$/i,
      },
      required: true,
    }),
  });
};
