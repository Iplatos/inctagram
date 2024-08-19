export type Replace<T, U> = Omit<T, keyof U> & U;

export type Nullable<T> = T | null;

export type PropsWithoutChildren<P = unknown> = P extends { children?: ReactNode | undefined }
  ? Omit<P, 'children'>
  : never;
