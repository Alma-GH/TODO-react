import React from 'react';
import cls from "./InputApply.module.css"

const InputApply = (props) => {
  return (
    <input {...props} className={cls.input}/>
  );
};

export default InputApply;