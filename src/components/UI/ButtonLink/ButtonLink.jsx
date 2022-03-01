import React from 'react';
import cls from "./ButtonLink.module.css"
import img from "../../../img/cancel.png"

const ButtonLink = (props) => {
  return (
    <button className={cls.btn}>
      <span className={cls.save}><img src={img} alt="☺" className={cls.saveIMG}/></span>
      <div className={cls.text}>{props.children}</div>
    </button>
  );
};

export default ButtonLink;