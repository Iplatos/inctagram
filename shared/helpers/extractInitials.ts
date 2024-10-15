export const extractInitials = (value: string, count: number = 2): string => {
  const words = value.split(' ');
  const initials = words.map(word => word.charAt(0).toUpperCase());

  return initials.slice(0, count).join('');
};
