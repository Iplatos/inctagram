import React, { ReactElement } from 'react';

import { AvatarFallback } from '@/assets/icons/avatar-fallback';
import { PGWithCropAspectRatio } from '@/entities/photo-gallery-with-crop';
import { PropsWithoutChildren } from '@/shared/types/helpers';
import { Typography } from '@/shared/ui';
import { PopoverProps, PopperContentProps } from '@radix-ui/react-popover';
import clsx from 'clsx';

import style from './crop.module.scss';

import { Popover } from '../popover-root';
import { TriggerButton } from '../trigger-button/trigger-button';

type CropListItem = { icon: () => ReactElement; label: string };

export type CropProps = {
  onAspectRatioChange: (value: PGWithCropAspectRatio) => void;

  onOpenChange?: PopoverProps['onOpenChange'];
  popoverContentProps?: PropsWithoutChildren<PopperContentProps>;
  selectedAspectRatio?: PGWithCropAspectRatio;
};

export const Crop = ({
  onAspectRatioChange,
  onOpenChange,
  popoverContentProps,
  selectedAspectRatio,
}: CropProps) => {
  /* eslint-disable perfectionist/sort-objects -- preserve the natural order of the aspect ratio list */
  const aspectRatioMap = {
    original: { label: 'Original', icon: () => <AvatarFallback /> },
    '1 / 1': { label: '1:1', icon: () => <div className={style.aspectRatioIcon} /> },
    '4 / 5': { label: '4:5', icon: () => <div className={style.aspectRatioIconVertical} /> },
    '16 / 9': { label: '16:9', icon: () => <div className={style.aspectRatioIconHorizontal} /> },
  } satisfies { [P in PGWithCropAspectRatio]?: CropListItem };

  const aspectRatioEntries = Object.entries(aspectRatioMap) as [
    PGWithCropAspectRatio,
    CropListItem,
  ][];
  /* eslint-enable perfectionist/sort-objects */

  return (
    <Popover.Root onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <TriggerButton variant={'crop'} />
      </Popover.Trigger>

      <Popover.Content {...popoverContentProps}>
        <div className={style.content}>
          {aspectRatioEntries.map(([aspectRatio, { icon: Icon, label }]) => (
            <div
              className={clsx(
                style.aspectRatio,
                aspectRatio === selectedAspectRatio && style.aspectRatioSelected
              )}
              key={label}
              onClick={() => onAspectRatioChange(aspectRatio)}
            >
              <Typography.Regular16 className={style.text}>{label}</Typography.Regular16>
              <Icon />
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
