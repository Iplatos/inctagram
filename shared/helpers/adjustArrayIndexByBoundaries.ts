export const adjustArrayIndexByBoundaries = (items: any[], index: number = 0) =>
  Math.max(Math.min(index, items.length - 1), 0);
