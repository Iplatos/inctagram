import React, { ReactElement } from 'react';

import { AvatarFallback } from '@/assets/icons/avatar-fallback';
import { PhotoSliderRenderItemAspectRatio } from '@/entities/photo-slider';
import { PropsWithoutChildren } from '@/shared/types/helpers';
import { Typography } from '@/shared/ui';
import { PopperContentProps } from '@radix-ui/react-popover';
import clsx from 'clsx';

import style from './crop.module.scss';

import { Popover } from '../popover-root';
import { TriggerButton } from '../trigger-button/trigger-button';

type CropListItem = { icon: () => ReactElement; label: string };

export type CropProps = {
  onAspectRatioChange: (value: PhotoSliderRenderItemAspectRatio) => void;

  popoverContentProps?: PropsWithoutChildren<PopperContentProps>;
  selectedAspectRatio?: PhotoSliderRenderItemAspectRatio;
};

export const Crop = ({
  onAspectRatioChange,
  popoverContentProps,
  selectedAspectRatio,
}: CropProps) => {
  /* eslint-disable perfectionist/sort-objects -- preserve the natural order of the aspect ratio list */
  const aspectRatioMap = {
    original: { label: 'Original', icon: () => <AvatarFallback /> },
    '1 / 1': { label: '1:1', icon: () => <div className={style.aspectRatioIcon} /> },
    '4 / 5': { label: '4:5', icon: () => <div className={style.aspectRatioIconVertical} /> },
    '16 / 9': { label: '16:9', icon: () => <div className={style.aspectRatioIconHorizontal} /> },
  } satisfies { [P in PhotoSliderRenderItemAspectRatio]?: CropListItem };

  const aspectRatioEntries = Object.entries(aspectRatioMap) as [
    PhotoSliderRenderItemAspectRatio,
    CropListItem,
  ][];
  /* eslint-enable perfectionist/sort-objects */

  return (
    <Popover.Root>
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
