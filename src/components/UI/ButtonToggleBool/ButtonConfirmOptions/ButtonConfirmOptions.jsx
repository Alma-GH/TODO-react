import React, {useContext} from 'react';
import ButtonToggleBool from "../ButtonToggleBool";
import Server from "../../../../tools/services/Server";
import {DatabaseContext} from "../../../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";

const ButtonConfirmOptions = ({func}) => {




  return (
    <ButtonToggleBool effect={func}>

    </ButtonToggleBool>
  );
};

export default ButtonConfirmOptions;