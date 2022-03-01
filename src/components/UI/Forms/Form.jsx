import React from 'react';
import InputApply from "../Apply/InputApply/InputApply";
import ButtonApply from "../Apply/ButtonApply/ButtonApply";
import cls from "./Form.module.css"

const Form = ({inputProps, btnFunc, btnName}) => {
  return (
    <div className={cls.form}>
      <InputApply {...inputProps}/>
      <ButtonApply func={btnFunc}>
        {btnName}
      </ButtonApply>
    </div>
  );
};

export default Form;