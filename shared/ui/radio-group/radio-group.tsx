import { ComponentPropsWithoutRef } from 'react';

import { Typography } from '@/shared/ui';
import * as Radio from '@radix-ui/react-radio-group';
import { clsx } from 'clsx';

import style from './radio-group.module.scss';

export type OptionsRadioGroup = {
  disabled?: boolean;
  id?: string;
  label?: string;
  value: string;
}[];

export type RadioGroupProps = {
  className?: string;
  options: OptionsRadioGroup;
} & Omit<ComponentPropsWithoutRef<typeof Radio.Root>, 'children'>;

export const RadioGroup = ({ className, options, ...rest }: RadioGroupProps) => {
  return (
    <Radio.Root
      className={clsx(style.radioGroupRoot, className)}
      defaultValue={options[0].value}
      {...rest}
    >
      {options.map(el => (
        <div className={style.radioGroup} key={el.value}>
          <Radio.Item
            className={clsx(style.item, el.disabled && style.disabled)}
            disabled={el.disabled}
            id={el.value}
            value={el.value}
          >
            <Radio.Indicator className={clsx(style.indicator, el.disabled && style.disabled)} />
          </Radio.Item>
          <Typography.Regular14
            className={clsx(style.label, el.disabled && style.disabled)}
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
