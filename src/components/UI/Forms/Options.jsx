import React from 'react';
import cls from "./Options.module.css"
import {splitCamelCase} from "../../../tools/func";

const Options = ({settings,setSettings}) => {

  function changeSettings(e){
    let setting = e.target.value
    let newSet = !settings[setting]
    setSettings({...settings, [setting]:newSet})
  }

  let rows = []
  for(let key in settings){
    rows.push(
      <div className={cls.row} key={key}>
        <div>{splitCamelCase(key[0].toUpperCase()+key.slice(1))}</div>
        <div className={cls.slideTwo + ` ${key}`}>
          <input type="checkbox" value={key} id={cls.slideTwo + ` ${key}`} name={key} checked={settings[key]} onChange={changeSettings}/>
          <label htmlFor={cls.slideTwo + ` ${key}`}></label>
        </div>
      </div>
    )

  }



  return (
    <div className={cls.column}>
      {rows}
    </div>
  );
};

export default Options;