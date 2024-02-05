import { FC, ReactNode } from 'react';

import { transformTaggedString } from '@/shared/helpers/transformTaggedString';

type TransType = {
  tags: Record<string, ({ content }: { content: string }) => ReactNode>;
  text: string;
};

export const Trans: FC<TransType> = ({ tags, text }) => {
  return <>{transformTaggedString.map(text, tags)}</>;
};
