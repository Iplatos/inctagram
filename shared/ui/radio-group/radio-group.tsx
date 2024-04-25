import { ComponentPropsWithoutRef } from 'react';

import { Typography } from '@/shared/ui';
import * as Radio from '@radix-ui/react-radio-group';
import { clsx } from 'clsx';

import style from './radio-group.module.scss';

export type RadioGroupOption = {
  disabled?: boolean;
  label?: string;
  value: string;
};

export type RadioGroupProps = {
  options: RadioGroupOption[];
} & Omit<ComponentPropsWithoutRef<typeof Radio.Root>, 'children'>;

export const RadioGroup = ({ className, defaultValue, options, ...rest }: RadioGroupProps) => {
  defaultValue ??= options[0].value;

  return (
    <Radio.Root className={clsx(style.root, className)} defaultValue={defaultValue} {...rest}>
      {options.map(el => (
        <div className={style.itemWrapper} key={el.value}>
          <Radio.Item
            className={clsx(style.item, el.disabled && style.disabled)}
            disabled={el.disabled}
            id={el.value}
            value={el.value}
          >
            <Radio.Indicator className={style.indicator} />
          </Radio.Item>
          <Typography.Regular14
            className={style.label}
            component={'label'}
            htmlFor={el.value}
            variant={'body2'}
          >
            {el.label}
          </Typography.Regular14>
        </div>
      ))}
    </Radio.Root>
  );
};
