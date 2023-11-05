import { ComponentPropsWithoutRef, useState } from 'react';

import close from 'assets/icons/close.svg';
import eye from 'assets/icons/eye-outline.svg';
import searchOutline from 'assets/icons/searchOutline.svg';

import s from './TextField.module.scss';

type InputType = 'input' | 'textarea';

type TextFieldProps<T extends InputType = 'input'> = {
  as?: T;
  className?: string;
  error?: string;
  inputType?: 'password' | 'text';
  isSearchInput?: boolean;
  label?: string;
  onChangeValue: (e: string) => void;
  placeholder: string;
  value: string;
} & ComponentPropsWithoutRef<T>;

export const TextField: React.FC<TextFieldProps> = props => {
  const {
    className,
    error,
    inputType = 'text',
    isSearchInput,
    label,
    onChangeValue,
    placeholder = 'email',
    value,
  } = props;

  const [type, setType] = useState(inputType);

  const changeInputType = () => {
    type === 'password' ? setType('text') : setType('password');
  };
  const clearTextField = () => {
    onChangeValue('');
  };
  const { as: Component = 'input', ...rest } = props;

  return (
    <div className={s.inputContainer}>
      <label>{label}</label>
      <Component
        {...rest}
        className={`${isSearchInput ? `${s.input} ${s.inputSearch}` : s.input} ${
          error ? `${s.input} ${s.error}` : s.input
        } ${className}`}
        disabled={false}
        onChange={e => onChangeValue(e.currentTarget.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {inputType !== 'text' && (
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
      <div className={s.errorMessage}>{error}</div>
    </div>
  );
};
