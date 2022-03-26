import React, {useContext} from 'react';
import cls from "./Options.module.css";
import Server from "../../../../tools/services/Server";
import {DatabaseContext} from "../../../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";

const OptionToggle = ({k, settings, setSettings}) => {

  const {auth,db} = useContext(DatabaseContext)
  const [user] = useAuthState(auth)

  async function changeSettings(e){
    let setting = e.target.value
    let newSet = !settings[setting]
    let newSettings = {...settings, [setting]:newSet}
    setSettings(newSettings)
    await Server.saveSettings(db,user.uid, newSettings)
  }

  return (
    <div className={cls.slideTwo + ` ${k}`}>
      <input type="checkbox" value={k} id={cls.slideTwo + ` ${k}`} name={k} checked={settings[k]} onChange={changeSettings}/>
      <label htmlFor={cls.slideTwo + ` ${k}`}/>
    </div>
  );
};

export default OptionToggle;