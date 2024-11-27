import { ReactNode } from 'react';

export type Replace<Target, Replacer> = Omit<Target, keyof Replacer> & Replacer;

export type Nullable<T> = T | null;

export type PropsWithoutChildren<P = unknown> = P extends { children?: ReactNode | undefined }
  ? Omit<P, 'children'>
  : never;
