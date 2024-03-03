import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './input.module.scss';

export type InputSlot = 'input' | 'inputRoot';
export type InputClasses = { [P in InputSlot]?: string };

type OwnProps = {
  classes?: InputClasses;
  endAdornment?: ReactNode;
  error?: boolean;
  onValueChange?: (value: string) => void;
  startAdornment?: ReactNode;
  type?: 'password' | 'search' | 'text';
};

export type InputProps = OwnProps &
  Omit<ComponentPropsWithoutRef<'input'>, 'className' | keyof OwnProps>;

export const Input = forwardRef<ElementRef<'input'>, InputProps>(
  (
    {
      classes = {},
      disabled,
      endAdornment,
      error,
      onChange,
      onValueChange,
      startAdornment,
      ...props
    },
    ref
  ) => {
    const cls = getClassNames(classes, { disabled, error });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <div className={cls.inputRoot}>
        {startAdornment && startAdornment}
        <input
          className={cls.input}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        {endAdornment && endAdornment}
      </div>
    );
  }
);

const getClassNames = (
  classes: InputClasses,
  { disabled, error }: Record<'disabled' | 'error', boolean | undefined>
): InputClasses => ({
  input: clsx(s.input, disabled && s.inputDisabled, error && s.inputError),
  inputRoot: clsx(
    s.inputRoot,
    disabled && s.inputRootDisabled,
    error && s.inputRootError,
    classes.inputRoot
  ),
});
