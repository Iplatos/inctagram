export const adjustArrayIndexByBoundaries = (arrayLength: number, index: number = 0) =>
  Math.max(Math.min(index, arrayLength - 1), 0);
