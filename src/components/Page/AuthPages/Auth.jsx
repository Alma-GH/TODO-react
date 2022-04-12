import React from 'react';
import cls from "./Auth.module.css"
import clsModal from "../../UI/Modal/Modal.module.css"

const Auth = (props) => {

  return (
    <div className={`${clsModal.modal} ${cls.authPage} ${clsModal.active}`}>
      <div className={`${clsModal.modalContent} ${cls.authContent}`}>
          {props.children}
      </div>
    </div>
  );
};

export default Auth;