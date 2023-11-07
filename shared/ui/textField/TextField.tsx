import { forwardRef, useState } from 'react';

import close from '@/assets/icons/close.svg';
import eye from '@/assets/icons/eye-outline.svg';
import SearchOutline from '@/assets/icons/searchOutline.svg';
import { Typography } from '@/shared/ui/typography';

import s from 'shared/ui/textField/TextField.module.scss';

type TextFieldType = 'input' | 'textarea';

type TextFieldProps<T extends TextFieldType = 'input'> = {
  as?: T;
  className?: string;
  disabled?: boolean;
  errors?: string;
  inputtype?: 'password' | 'text';
  isSearchInput?: boolean;
  label?: string;
  onChange: (e: string) => void;
  placeholder: string;
  value: string;
}; //& ComponentPropsWithoutRef<T>;

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
          <img alt={'search logo'} src={eye.src} />
        </button>
      )}
      {isSearchInput && value && (
        <button
          className={!label ? s.button : `${s.buttonWithLabel} ${s.button}`}
          onClick={clearTextField}
        >
          <img alt={'close logo'} src={close.src} />
        </button>
      )}
      {isSearchInput && (
        <SearchOutline
          alt={'searchOutline logo'}
          className={!label ? s.searchOutline : `${s.searchOutline} ${s.searchOutlineWithLabel} `}
        />
      )}
      <div className={s.errorMessage}>{errors}</div>
    </div>
  );
});
