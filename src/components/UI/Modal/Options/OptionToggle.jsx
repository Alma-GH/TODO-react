import React from 'react';
import cls from "./Options.module.css";

const OptionToggle = ({k, settings, setSettings}) => {

  function changeSettings(e){
    let setting = e.target.value
    let newSet = !settings[setting]
    let newSettings = {...settings, [setting]:newSet}
    setSettings(newSettings)
  }

  return (
    <div className={cls.slideTwo + ` ${k}`}>
      <input type="checkbox" value={k} id={cls.slideTwo + ` ${k}`} name={k} checked={settings[k]} onChange={changeSettings}/>
      <label htmlFor={cls.slideTwo + ` ${k}`}/>
    </div>
  );
};

export default OptionToggle;