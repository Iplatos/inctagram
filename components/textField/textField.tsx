import s from "../textField/textField.module.scss";
import { ComponentPropsWithoutRef, useState } from "react";
import eye from "assets/icons/eye-outline.svg";
import close from "assets/icons/close.svg";
import searchOutline from "assets/icons/searchOutline.svg";

type TextFieldProps = {
  label?: string
  inputType?: "text" | "password"
  value: string
  onChangeValue: (e: string) => void
  isSearchInput?: boolean
  error?:string
} & ComponentPropsWithoutRef<"input">

export const TextField = (props: TextFieldProps) => {
  const {
    label,
    inputType = "text",
    value,
    error,
    isSearchInput,
    onChangeValue
  } = props;
  const [type, setType] = useState(inputType);

  const changeInputType = () => {
    type === "password" ? setType("text") : setType("password");
  };
  const clearTextField = () => {
    onChangeValue("")
  };
  console.log(error);
  return (
    <div className={s.inputContainer}>
      <label>{label}</label>
      <input value={value} onChange={(e)=>onChangeValue(e.currentTarget.value)}
             type={type} className={`${ isSearchInput ? `${s.input} ${s.inputSearch}` : s.input } ${error? `${s.input} ${s.error}`: s.input}`}
             disabled={false} placeholder={"email"} />
      {inputType !== "text" && <button onClick={changeInputType}
                                       className={s.button}>
        <img src={eye.src} />
      </button>}
      {isSearchInput && value && <button onClick={clearTextField}
                                className={s.button}>
        <img src={close.src} />
      </button>}
      {isSearchInput && <img className={s.searchOutline} src={searchOutline.src} />}
      <div className={s.errorMessage}>{error}</div>

    </div>
  );
};