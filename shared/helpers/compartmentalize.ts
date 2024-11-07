export const compartmentalize = (value: number | string, count: number = 3): string => {
  const str = String(value);

  let start = str.length % count;
  const parts = start ? [str.slice(0, start)] : [];

  for (; start < str.length; start += 3) {
    const part = str.slice(start, start + 3);

    parts.push(part);
  }

  return parts.join(' ');
};
