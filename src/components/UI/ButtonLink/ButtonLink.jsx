import React from 'react';
import cls from "./ButtonLink.module.css"
import imgSave from "../../../img/cancel.png"
import imgNotSave from "../../../img/black-circle.png"

const ButtonLink = (props) => {

  let saveMap = props.isSave
  return (
    <button className={cls.btn}>
      <span className={cls.save}>
        {saveMap[props.children]
        ? <img src={imgSave} alt="☺" className={cls.saveIMG}/>
        : <img src={imgNotSave} alt="☻" className={cls.saveIMG}/>
        }

      </span>
      <div className={cls.text}>{props.children}</div>
    </button>
  );
};

export default ButtonLink;