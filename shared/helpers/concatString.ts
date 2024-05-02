export const concatString = (string: string) => {
  const splitted = string.split(' ');

  if (splitted.length > 1) {
    const array = string
      .trim()
      .split(/\s+/)
      .map(word => word[0].toUpperCase() + word.substring(1));

    array[0] = splitted[0];

    return array.join('-');
  }

  return string.toLowerCase();
};
