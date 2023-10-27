import s from "../textField/textField.module.scss";
import { ComponentPropsWithoutRef, useState } from "react";
import eye from 'assets/icons/eye-outline.svg'

type TextFieldProps = {
  label?: string
  value:string
  onChangeValue:(e:string)=>void
  inputType?:'text' | 'password'
}& ComponentPropsWithoutRef<'input'>

export const TextField = (props: TextFieldProps) => {

  const [type,setType] = useState(props.inputType)

  const changeInputType = () => {
    if (type ==="password"){
      setType("text")
    }if (type !=="password"){
      setType("password")
    }

  }

  return (
    <div className={s.inputContainer}>
      <label>{props.label}</label>
      <input type={type} className={s.input} disabled={false} placeholder={"email"} />
      {props.inputType ==="password" && <button onClick={changeInputType}
                                                className={s.button}>
        <img src={eye.src}/>
      </button>}




    </div>
  );
};