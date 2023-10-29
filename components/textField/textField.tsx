import s from "../textField/textField.module.scss";
import { ComponentPropsWithoutRef, ElementType, useState } from "react";
import eye from "assets/icons/eye-outline.svg";
import close from "assets/icons/close.svg";
import searchOutline from "assets/icons/searchOutline.svg";

type TextFieldProps <T extends ElementType = 'input'>= {
  as?:T
  label?: string
  inputType?: "text" | "password"
  value: string
  onChangeValue: (e: string) => void
  isSearchInput?: boolean
  error?:string
  className?:string
} & ComponentPropsWithoutRef<T>

export const TextField = <T extends ElementType = 'input'>(props: TextFieldProps<T>
  & Omit<ComponentPropsWithoutRef<T>, keyof TextFieldProps<T>>) => {
  const {
    label,
    inputType = "text",
    value,
    error,
    isSearchInput,
    onChangeValue,
    className
  } = props;

  const [type, setType] = useState(inputType);

  const changeInputType = () => {
    type === "password" ? setType("text") : setType("password");
  };
  const clearTextField = () => {
    onChangeValue("")
  };
  const { as: Component = 'input', ...rest } = props

  return (
    <div className={s.inputContainer}>
      <label>{label}</label>
      <Component value={value} onChange={(e)=>onChangeValue(e.currentTarget.value)}
             type={type} className={`${ isSearchInput ? `${s.input} ${s.inputSearch}` : s.input } ${error? `${s.input} ${s.error}`: s.input} ${className}`}
             disabled={false} placeholder={"email"} {...rest}/>
      {inputType !== "text" && <button onClick={changeInputType}
                                       className={s.button}>
        <img src={eye.src} alt={'search logo'} />
      </button>}
      {isSearchInput && value && <button onClick={clearTextField}
                                className={s.button}>
        <img src={close.src} alt={'close logo'} />
      </button>}
      {isSearchInput && <img className={s.searchOutline} src={searchOutline.src} alt={'searchOutline logo'}/>}
      <div className={s.errorMessage}>{error}</div>
    </div>
  );
};