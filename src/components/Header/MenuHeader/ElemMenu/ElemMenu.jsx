import React from 'react';
import cls from "./ElemMenu.module.css"

const ElemMenu = (props) => {
  return (
    <button className={cls.btn} onClick={props.func}>
      {props.children}
    </button>
  );
};

export default ElemMenu;