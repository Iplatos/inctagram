import { FC, PropsWithChildren } from 'react';

import { PhotoAspectRatio } from '@/shared/constants';
import clsx from 'clsx';

export const PhotoGalleryPreviewImageWrapper: FC<
  PropsWithChildren<{ aspectRatio?: PhotoAspectRatio }>
> = ({ aspectRatio, children }) => {
  const getWrapperClassName = (wrapper: 'inner' | 'outer', aspectRatio?: PhotoAspectRatio) => {
    const baseClassName = `image-gallery-image-${wrapper}-wrapper`;

    return clsx(baseClassName, aspectRatio && `${baseClassName}-with-ar`);
  };

  const outerWrapperStyle = {
    ...(!!aspectRatio && ({ '--aspect-ratio': aspectRatio } as Record<string, string>)),
  };

  return (
    <div className={getWrapperClassName('outer', aspectRatio)} style={outerWrapperStyle}>
      <div className={getWrapperClassName('inner', aspectRatio)}>{children}</div>
    </div>
  );
};
