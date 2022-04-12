import React, {useContext} from 'react';
import ButtonToggleBool from "../ButtonToggleBool";
import cls from "./ButtonExit.module.css"
import cancel from "./../../../../img_svg/cancel.png"
import {DatabaseContext} from "../../../../context/db";
import {useNavigate} from "react-router-dom";


const ButtonExit = X => {

  const {auth} = useContext(DatabaseContext)
  const push = useNavigate()

  function logout(){
    if(window.confirm("Вы действительно хотите выйти?\nВсе несохраненные данные будут потеряны"))
      auth.signOut()
      push("./auth/login")
  }

  return (
    <ButtonToggleBool effect={logout}>
      <div className={cls.inBtnExit}>
        <img src={cancel} alt="X"/>
      </div>
    </ButtonToggleBool>
  );
};

export default ButtonExit;