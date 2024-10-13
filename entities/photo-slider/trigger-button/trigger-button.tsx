import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from 'react';

import { ExpandOutline } from '@/assets/icons/expand-outline';
import { PropsWithoutChildren } from '@/shared/types/helpers';
import { AvatarFallback } from 'assets/icons/avatar-fallback';
import { MaximizeOutline } from 'assets/icons/maximize-outline';
import { PlusCircleOutline } from 'assets/icons/plus-circle-outline';
import clsx from 'clsx';

import style from './trigger-button.module.scss';

type TriggerButtonVariant = 'crop' | 'image' | 'upload' | 'zoom';
type TriggerPropsType = PropsWithoutChildren<ComponentPropsWithoutRef<'button'>> & {
  variant: TriggerButtonVariant;
};

const iconsMap = {
  crop: ExpandOutline,
  image: AvatarFallback,
  upload: PlusCircleOutline,
  zoom: MaximizeOutline,
} satisfies Record<TriggerButtonVariant, FC>;

export const TriggerButton = forwardRef<ElementRef<'button'>, TriggerPropsType>(
  ({ className, variant, ...props }, ref) => {
    const IconComponent = iconsMap[variant];

    return (
      <button
        className={clsx(className, variant === 'upload' ? style.buttonPlus : style.button)}
        ref={ref}
        type={'button'}
        {...props}
      >
        <IconComponent className={style.svg} />
      </button>
    );
  }
);
