import React from 'react';
import InputApply from "../Apply/InputApply/InputApply";
import ButtonApply from "../Apply/ButtonApply/ButtonApply";
import cls from "./Form.module.css"

const Form = ({btnFunc, btnName, children}) => {

  function submit(e){
    e.preventDefault()
    if(btnFunc !== undefined) btnFunc()
  }

  return (
    <form action="" onSubmit={submit}>
      <div className={cls.form}>
        {children}
        <ButtonApply>
          {btnName}
        </ButtonApply>
      </div>
    </form>

  );
};

export default Form;