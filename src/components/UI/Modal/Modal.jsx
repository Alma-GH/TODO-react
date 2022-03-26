import React from 'react';
import cls from "./Modal.module.css"

const Modal = (props) => {

  let vis = props.visible
  let setVis = props.setVisible


  let style = [cls.modal]
  if(vis === true) style.push(cls.active)

  function hideModal(){
    setVis(false)
    props.setBodyModal("")
  }


  return (
    <div className={style.join(" ")} onClick={hideModal}>
      <div className={cls.modalContent}  onClick={e=>e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;