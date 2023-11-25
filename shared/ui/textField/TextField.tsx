import { forwardRef, useState } from 'react';

import Close from '@/assets/icons/close.svg?url';
import Eye from '@/assets/icons/eye-outline.svg?url';
import SearchOutline from '@/assets/icons/searchOutline.svg?url';
import { Typography } from '@/shared/ui/typography';
import Image from 'next/image';

import s from 'shared/ui/textField/TextField.module.scss';

type TextFieldType = 'input' | 'textarea';

export type TextFieldProps<T extends TextFieldType = 'input'> = {
  as?: T;
  className?: string;
  disabled?: boolean;
  errors?: string;
  inputtype?: 'password' | 'text';
  isSearchInput?: boolean;
  label?: string;
  onChange: (e: string) => void;
  placeholder?: string;
  value: string;
};

export const TextField = forwardRef((props: TextFieldProps, ref) => {
  const {
    className,
    disabled,
    errors,
    inputtype = 'text',
    isSearchInput,
    label,
    onChange,
    placeholder = 'email',
    value,
  } = props;

  const [type, setType] = useState(inputtype);

  const changeInputType = () => {
    type === 'password' ? setType('text') : setType('password');
  };

  const clearTextField = () => {
    onChange('');
  };

  const { as: Component = 'input', ...rest } = props;

  return (
    <div className={s.inputContainer}>
      <Typography.Regular14 color={'var(--color-light-900)'}>{label}</Typography.Regular14>
      <Component
        {...rest}
        className={`${isSearchInput ? `${s.input} ${s.inputSearch}` : s.input} ${
          errors ? `${s.input} ${s.error}` : s.input
        } ${className}`}
        disabled={disabled}
        onChange={e => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {inputtype !== 'text' && (
        <button
          className={!label ? s.button : `${s.buttonWithLabel} ${s.button}`}
          onClick={changeInputType}
          type={'button'}
        >
          <Image alt={'bell'} src={Eye} />
        </button>
      )}
      {isSearchInput && value && (
        <button
          className={!label ? s.button : `${s.buttonWithLabel} ${s.button}`}
          onClick={clearTextField}
        >
          <Image alt={'close Logo'} src={Close} />
        </button>
      )}
      {isSearchInput && (
        <Image
          alt={'searchOutline logo'}
          className={!label ? s.searchOutline : `${s.searchOutline} ${s.searchOutlineWithLabel} `}
          src={SearchOutline}
        />
      )}
      <div className={s.errorMessage}>{errors}</div>
    </div>
  );
});
