import React from 'react';
import cls from "./ErrorMessage.module.css"

const ErrorMessage = ({children, addClass}) => {

  let styleErr = [cls.error]
  if(addClass) styleErr.push(addClass)

  return (
    <div className={styleErr.join(" ")}>
      {children}
    </div>
  );
};

export default ErrorMessage;