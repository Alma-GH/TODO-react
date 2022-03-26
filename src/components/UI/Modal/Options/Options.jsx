import React from 'react';
import cls from "./Options.module.css"
import {splitCamelCase} from "../../../../tools/utils/func";
import OptionToggle from "./OptionToggle";
import OptionInput from "./OptionInput";
import {set} from "firebase/database";

const Options = ({settings,setSettings}) => {


  let rows = []
  let sortSettings = Array.from(Object.entries(settings)).sort((a,b)=>{
    return typeof a[1] === "boolean" ? -1 : 1
  })

  for(let key in Object.fromEntries(sortSettings)){
    rows.push(
      <div className={cls.row} key={key}>
        <div style={{width:"50%"}}>{splitCamelCase(key[0].toUpperCase()+key.slice(1))}</div>
        {typeof settings[key] === "boolean"
          ?<OptionToggle k={key} settings={settings} setSettings={setSettings}/>
          :<OptionInput k={key} settings={settings} setSettings={setSettings}/>
        }
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