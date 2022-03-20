import React, {useContext} from 'react';
import ButtonToggleBool from "../ButtonToggleBool";
import {AuthContext} from "../../../../context/auth";
import cls from "./ButtonExit.module.css"
import cancel from "./../../../../img_svg/cancel.png"
import {DatabaseContext} from "../../../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";


const ButtonExit = X => {

  const {auth} = useContext(DatabaseContext)

  function logout(){
    auth.signOut()
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