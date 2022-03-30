import React from 'react';
import cls from "./ButtonApply.module.css"

const ButtonApply = ({children, func, buttonProps}) => {


  return (
    <button {...buttonProps} className={cls.button + ` ${cls.btn}`} onClick={func}>
      {children}
    </button>
  );
};

export default ButtonApply;