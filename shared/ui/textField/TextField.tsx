import { ChangeEvent, ForwardedRef, ReactNode, forwardRef, useState } from 'react';

import Close from '@/assets/icons/close.svg?url';
import Eye from '@/assets/icons/eye-outline.svg?url';
import SearchOutline from '@/assets/icons/search-outline.svg?url';
import { Typography } from '@/shared/ui/typography';
import { clsx } from 'clsx';
import Image from 'next/image';

import s from 'shared/ui/textField/TextField.module.scss';

type SharedProps = {
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  required?: boolean;
  value: string;
};

// If you pass this type as a generic parameter, TS will prevent you from using props specific to union members.
// To be able to pass these props, you can extract the desired union member using the Extract utility type.
// https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union
export type TextFieldProps =
  | (SharedProps & {
      as?: 'input';
      inputType?: 'password' | 'search' | 'text';
    })
  | (SharedProps & { as: 'textarea' });

// Forces the 'ref' type match the 'as' prop type. You should not specify the 'as' props dynamically.
// Use only the literal value to avoid possible errors with non-existent properties of the target element pointed by the 'ref'.
// prettier-ignore
export type TextFieldComponent = {
  (props: Extract<TextFieldProps, { as: "textarea" }> & { ref?: ForwardedRef<HTMLTextAreaElement> }): ReactNode;
  (props: Extract<TextFieldProps, { as?: "input" }> & { ref?: ForwardedRef<HTMLInputElement> }): ReactNode;
}

export const TextField: TextFieldComponent = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(({ className, error, label, onChange, required, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange(e.currentTarget.value);

  const sharedClassName = clsx(s.input, error && s.error, className);
  let resolvedFragment: ReactNode;

  // Do not destructure the 'as' prop before 'if' statement
  // because TS will lose the connection between the 'as' prop and type of the remaining props
  if (!props.as || props.as === 'input') {
    const { as, inputType, ...restProps } = props;
    const isSearch = inputType === 'search';
    const isPassword = inputType === 'password';
    const passwordFieldNextType = showPassword ? 'text' : 'password';

    resolvedFragment = (
      <>
        <input
          className={clsx(sharedClassName, isSearch && s.inputSearch)}
          onChange={handleChange}
          ref={ref as unknown as ForwardedRef<HTMLInputElement>}
          type={isPassword ? passwordFieldNextType : inputType}
          {...restProps}
        />
        {isPassword && (
          <button
            className={clsx(s.button, label && s.buttonWithLabel)}
            onClick={() => setShowPassword(prev => !prev)}
            type={'button'}
          >
            <Image alt={'bell'} src={Eye} />
          </button>
        )}
        {isSearch && props.value && (
          <button
            className={clsx(s.button, label && s.buttonWithLabel)}
            onClick={() => onChange('')}
          >
            <Image alt={'close Logo'} src={Close} />
          </button>
        )}
        {isSearch && (
          <Image
            alt={'searchOutline logo'}
            className={clsx(s.searchOutline, label && s.searchOutlineWithLabel)}
            src={SearchOutline}
          />
        )}
      </>
    );
  }

  if (props.as === 'textarea') {
    const { as, ...restProps } = props;

    resolvedFragment = (
      <textarea
        className={sharedClassName}
        onChange={handleChange}
        ref={ref as unknown as ForwardedRef<HTMLTextAreaElement>}
        {...restProps}
      />
    );
  }

  return (
    <div className={s.inputContainer}>
      <Typography.Regular14 color={'var(--color-light-900)'}>
        {label}
        {required && <Typography.Regular14 color={'red'}>*</Typography.Regular14>}
      </Typography.Regular14>
      {resolvedFragment}
      <div className={s.errorMessage}>{error}</div>
    </div>
  );
});
