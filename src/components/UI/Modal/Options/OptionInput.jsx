import React, {useContext, useState} from 'react';
import MyInput from "../../MyInput/MyInput";
import InputApply from "../../Apply/InputApply/InputApply";
import cls from "./Options.module.css"
import Server from "../../../../tools/services/Server";
import {DatabaseContext} from "../../../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";


const OptionInput = ({k, settings, setSettings}) => {

  const {auth,db} = useContext(DatabaseContext)
  const [user] = useAuthState(auth)

  async function changeSettings(e){
    let newSet = e.target.value
    let newSettings = {...settings, [k]:newSet}
    setSettings(newSettings)
    await Server.saveSettings(db,user.uid, newSettings)
  }

  return (
    <input className={cls.optionInput}  value={settings[k]} onChange={changeSettings}/>
  );
};

export default OptionInput;