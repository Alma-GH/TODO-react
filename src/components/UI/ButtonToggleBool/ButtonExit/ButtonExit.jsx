import React, {useContext} from 'react';
import ButtonToggleBool from "../ButtonToggleBool";
import {AuthContext} from "../../../../context/auth";
import cls from "./ButtonExit.module.css"
import cancel from "./../../../../img_svg/cancel.png"


const ButtonExit = X => {

  const {isAuth, setIsAuth} = useContext(AuthContext)

  return (
    <ButtonToggleBool setter={setIsAuth} now={isAuth}>
      <div className={cls.inBtnExit}>
        <img src={cancel} alt="X"/>
      </div>
    </ButtonToggleBool>
  );
};

export default ButtonExit;