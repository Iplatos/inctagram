export const compartmentalize = (value: number | string, count: number = 3): string => {
  const str = typeof value === 'string' ? value : value.toString();
  const regex = new RegExp(`\\B(?=(\\d{${count}})+(?!\\d))`, 'g');

  return str.replace(regex, ' ');
};
