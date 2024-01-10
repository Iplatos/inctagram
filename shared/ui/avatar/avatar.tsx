import { FC, ReactNode } from 'react';

import { capitalise } from '@/shared/helpers/capitalise';
import * as AvatarRadix from '@radix-ui/react-avatar';
import { clsx } from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps as NextImageProps } from 'next/image';

import s from './avatar.module.scss';

type AvatarSlot = 'avatarRoot' | 'fallback' | 'image';
export type AvatarClasses = { [P in AvatarSlot]?: string };
type AvatarSize = 'large' | 'medium' | 'small';

type OwnProps = {
  alt?: string;
  classes?: AvatarClasses;
  fallback?: ReactNode;
  fallbackDelayMs?: number;
  size?: AvatarSize;
};

export type AvatarProps = OwnProps & Omit<NextImageProps, 'className' | keyof OwnProps>;

export const Avatar: FC<AvatarProps> = ({
  alt = 'user avatar',
  classes = {},
  fallback,
  fallbackDelayMs,
  size = 'medium',
  src,
  ...props
}) => {
  const cls = getClassNames(classes, size);

  return (
    <AvatarRadix.Root className={cls.avatarRoot}>
      <AvatarRadix.Image alt={alt} asChild src={resolveImageSrcToString(src)}>
        <Image alt={alt} className={cls.image} src={src} {...props} />
      </AvatarRadix.Image>
      <AvatarRadix.Fallback className={cls.fallback} delayMs={fallbackDelayMs}>
        {fallback}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  );
};

// NextImage 'src' prop type is 'StaticImport', which is not applicable for AvatarRadix.Image
const resolveImageSrcToString = (src: StaticImport | string): string => {
  const isStaticImportObject = typeof src === 'object';
  const isStaticRequire = isStaticImportObject && 'default' in src;

  if (isStaticRequire) {
    return src.default.src;
  }
  if (isStaticImportObject) {
    return src.src;
  }

  return src;
};

const getClassNames = (classes: AvatarClasses, size: AvatarSize): AvatarClasses => ({
  avatarRoot: clsx(s[`avatarRoot${capitalise(size)}`], classes.avatarRoot),
  fallback: clsx(s.fallback, classes.fallback),
  image: clsx(s.image, classes.image),
});
