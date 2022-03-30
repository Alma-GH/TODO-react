import React, {useContext, useEffect, useState} from 'react';
import cls from "./Options.module.css"
import {splitCamelCase} from "../../../../tools/utils/func";
import OptionToggle from "./OptionToggle";
import OptionInput from "./OptionInput";
import {strHintSettings, validFunctionsForSettings} from "../../../../tools/globalConstants";
import {useFetching} from "../../../../hooks/useFetching";
import Server from "../../../../tools/services/Server";
import {DatabaseContext} from "../../../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";
import ButtonApply from "../../Apply/ButtonApply/ButtonApply";
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";
import Loader from "../../../Loader/Loader";
import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory(React)

const Options = ({settings,setSettings,setModal}) => {

  const {auth,db} = useContext(DatabaseContext)
  const [user] = useAuthState(auth)

  const [copySettings,setCopySettings] = useState({...settings})

  const [fetchSettings,load,err] = useFetching(async ()=>{
    let newSettings = {}
    for(let key in copySettings){
      newSettings[key] = validFunctionsForSettings[key](copySettings[key])
    }

    await Server.saveSettings(db,user.uid,newSettings)
    setSettings(newSettings)
    setModal(false)
  })

  useEffect(()=>{
    setCopySettings({...settings})
  }, [settings])


  let rows = []
  let sortSettings = Array.from(Object.entries(copySettings)).sort((a)=>{
    return typeof a[1] === "boolean" ? -1 : 1
  })



  for(let key in Object.fromEntries(sortSettings)){

    rows.push(
      <div className={cls.row} key={key}>
        <div data-custom data-custom-title={strHintSettings.tooltip[key]} style={{width:"50%"}}>
          {splitCamelCase(key[0].toUpperCase()+key.slice(1))}
          <br/>
          <div className={cls.limitation}>{strHintSettings.limitation[key]}</div>
        </div>
        {typeof copySettings[key] === "boolean"
          ?<OptionToggle k={key} settings={copySettings} setSettings={setCopySettings}/>
          :<OptionInput k={key} settings={copySettings} setSettings={setCopySettings}/>
        }
      </div>
    )
  }



  return (
    <div className={cls.column}>

      <ReactHint
        events
        className={cls.tooltipHint}
        attribute="data-custom"
        delay={{show: 250, hide: 500}}
        onRenderContent={(target) => (<div>{`${target.dataset.customTitle}`}</div>)}
      />
      {rows}

      {err && <ErrorMessage>{err.message}</ErrorMessage>}

      <div className={cls.btnWrap}>
        <ButtonApply func={fetchSettings}>
          Save
        </ButtonApply>
      </div>


      {load && <Loader classBG={cls.loaderBG} classWrap={cls.loader} />}
    </div>
  );
};

export default Options;