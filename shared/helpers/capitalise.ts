// TODO: add a description for the helper using JSDoc
export const capitalise = (string: string, preserveRest = false) => {
  if (!string.length) {
    return '';
  }

  return (
    string.slice(0, 1).toUpperCase() +
    (preserveRest ? string.slice(1) : string.slice(1).toLowerCase())
  );
};
