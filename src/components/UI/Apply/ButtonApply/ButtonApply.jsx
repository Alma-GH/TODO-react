import React from 'react';
import cls from "./ButtonApply.module.css"

const ButtonApply = ({children, func}) => {


  return (
    <button className={cls.button} onClick={func}>
      {children}
    </button>
  );
};

export default ButtonApply;