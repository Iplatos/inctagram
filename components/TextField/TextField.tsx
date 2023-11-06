import { forwardRef, useState } from 'react';

import close from 'assets/icons/close.svg';
import eye from 'assets/icons/eye-outline.svg';
import searchOutline from 'assets/icons/searchOutline.svg';

import s from './TextField.module.scss';

type TextFieldType = 'input' | 'textarea';

type TextFieldProps<T extends TextFieldType = 'input'> = {
  as?: T;
  className?: string;
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
      <label>{label}</label>
      <Component
        {...rest}
        className={`${isSearchInput ? `${s.input} ${s.inputSearch}` : s.input} ${
          errors ? `${s.input} ${s.error}` : s.input
        } ${className}`}
        disabled={false}
        onChange={e => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {inputtype !== 'text' && (
        <button className={s.button} onClick={changeInputType}>
          <img alt={'search logo'} src={eye.src} />
        </button>
      )}
      {isSearchInput && value && (
        <button className={s.button} onClick={clearTextField}>
          <img alt={'close logo'} src={close.src} />
        </button>
      )}
      {isSearchInput && (
        <img alt={'searchOutline logo'} className={s.searchOutline} src={searchOutline.src} />
      )}
      <div className={s.errorMessage}>{errors}</div>
    </div>
  );
});
