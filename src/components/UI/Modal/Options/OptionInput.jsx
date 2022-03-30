import React from 'react';
import cls from "./Options.module.css"


const OptionInput = ({k, settings, setSettings}) => {

  function changeSettings(e){
    let newSet = e.target.value
    let newSettings = {...settings, [k]:newSet}
    setSettings(newSettings)
  }

  return (
    <input size="3" className={cls.optionInput}  value={settings[k]} onChange={changeSettings}/>
  );
};

export default OptionInput;