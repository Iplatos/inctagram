export const getAbbreviation = (value: string) => {
  if (!value.length) {
    return '';
  }

  return value
    .split(' ')
    .map(substr => substr.charAt(0).toUpperCase())
    .join('');
};
