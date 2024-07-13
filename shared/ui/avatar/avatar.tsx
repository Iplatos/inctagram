import { FC, ReactEventHandler, ReactNode, useEffect, useRef, useState } from 'react';

import { AvatarFallback } from '@/assets/icons/avatar-fallback';
import { capitalise } from '@/shared/helpers/capitalise';
import { resolveImageSrcToString } from '@/shared/helpers/resolveImageSrcToString';
import { Replace } from '@/shared/types/helpers';
import { CroppedImage, CroppedImageProps, CroppedImageSlot } from '@/shared/ui/croppedImage';
import { clsx } from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './avatar.module.scss';

export type AvatarSlot = 'avatarRoot' | 'fallback' | Extract<CroppedImageSlot, 'image'>;
export type AvatarClasses = { [P in AvatarSlot]?: string };
export type AvatarSize = 'large' | 'medium' | 'small';
type AvatarStatus = 'error' | 'pending' | 'success';

type OwnProps = {
  alt?: string;
  classes?: AvatarClasses;
  delayMs?: number;
  fallback?: ReactNode;
  size?: AvatarSize;
  src?: StaticImport | string;
};

export type AvatarProps = Replace<Omit<CroppedImageProps, 'fill' | 'height' | 'width'>, OwnProps>;

export const Avatar: FC<AvatarProps> = ({ src, ...props }) => (
  <InnerComponent key={resolveImageSrcToString(src)} src={src} {...props} />
);

const InnerComponent: FC<AvatarProps> = ({
  alt = '',
  classes = {},
  delayMs,
  fallback = <AvatarFallback />,
  onError,
  onLoad,
  size = 'medium',
  src,
  ...props
}) => {
  const [status, setStatus] = useState<AvatarStatus>('pending');
  const [delayExpired, setDelayExpired] = useState(!delayMs);
  const timerRef = useRef<number>();

  useEffect(() => {
    if (delayMs && status === 'pending') {
      timerRef.current = window.setTimeout(() => {
        setDelayExpired(true);
      }, delayMs);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [delayMs, status]);

  const cls = getClassNames(classes, size);

  const handleLoad: ReactEventHandler<HTMLImageElement> = e => {
    setStatus('success');
    onLoad?.(e);
  };
  const handleError: ReactEventHandler<HTMLImageElement> = e => {
    setStatus('error');
    onError?.(e);
  };

  const showAvatar = src && status !== 'error';
  const showFallback = status === 'error' || delayExpired;

  return (
    <span className={cls.avatarRoot}>
      {showAvatar ? (
        <CroppedImage
          alt={alt}
          classes={cls}
          fill
          onError={handleError}
          onLoad={handleLoad}
          src={src}
          {...props}
        />
      ) : (
        <span className={cls.fallback}>{showFallback && fallback}</span>
      )}
    </span>
  );
};

const getClassNames = (classes: AvatarClasses, size: AvatarSize): Required<AvatarClasses> => ({
  avatarRoot: clsx(s[`avatarRoot${capitalise(size)}`], classes.avatarRoot),
  fallback: clsx(s.fallback, classes.fallback),
  image: clsx(s.image, classes.image),
});
