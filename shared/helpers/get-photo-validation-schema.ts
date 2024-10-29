import { z } from 'zod';

type PhotoValidationConfig = {
  // readonly array is required to construct the `enum` schema in Zod.
  allowedFormats: readonly [string, ...string[]];
  maxSize?: number;
};

type ErrorsMap = {
  tooBig?: (arg: File) => string;
  wrongFormat?: (arg: File) => string;
};

const getDefaultValidationErrorsMap = ({
  allowedFormats,
  maxSize,
}: PhotoValidationConfig): Required<ErrorsMap> => ({
  tooBig: file =>
    `The photo must be less than ${maxSize} bytes. Provided photo size: ${file.size} bytes.`,
  wrongFormat: file =>
    `The photo must have one of this formats: ${allowedFormats}. Provided format: ${file.type}.`,
});

export const getPhotoValidationSchema = (config: PhotoValidationConfig, errorsMap?: ErrorsMap) => {
  const { allowedFormats, maxSize } = config;

  const resolvedErrorsMap = {
    ...getDefaultValidationErrorsMap(config),
    ...errorsMap,
  };

  let schema = z.custom<File>().refine(
    ({ type }) => z.enum(allowedFormats).safeParse(type).success,
    value => ({ message: resolvedErrorsMap.wrongFormat(value) })
  );

  if (maxSize) {
    schema = schema.refine(
      ({ size }) => z.number().max(maxSize).safeParse(size).success,
      value => ({ message: resolvedErrorsMap.tooBig(value) })
    );
  }

  return schema;
};
