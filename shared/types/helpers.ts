export type Replace<T, U> = Omit<T, keyof U> & U;

export type Nullable<T> = T | null;
