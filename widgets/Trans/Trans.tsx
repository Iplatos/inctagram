import { FC, Fragment, ReactNode } from 'react';

import { transformTaggedString } from '@/shared/helpers/transformTaggedString';

type TransType = {
  tags: Record<string, ({ content }: { content: string }) => ReactNode>;
  text: string;
};

export const Trans: FC<TransType> = ({ tags, text }): ReactNode[] => {
  const wrappedTags = Object.keys(tags).reduce<TransType['tags']>((acc, tagKey, i) => {
    acc[tagKey] = args => (
      <Fragment key={args.content || `tag-${i}`}>{tags[tagKey](args)}</Fragment>
    );

    return acc;
  }, {});

  return transformTaggedString.map(text, wrappedTags);
};
