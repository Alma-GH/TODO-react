import React from 'react';
import cls from "./ButtonLink.module.css"


const ButtonLink = (props) => {

  return (
      <button className={cls.btn}>
        <div className={cls.text}>{props.children}</div>
      </button>
  );
};

export default ButtonLink;