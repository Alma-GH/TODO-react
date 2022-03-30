import React from 'react';
import cls from "./ElemMenu.module.css"

const ElemMenu = ({disabled,func,children}) => {
  return (
    <button className={cls.btn} onClick={func} disabled={disabled}>
      {children}
    </button>
  );
};

export default ElemMenu;