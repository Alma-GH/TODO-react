import React, {useContext} from 'react';
import cls from "./ButtonRoller.module.css"
import PageService from "../../../../tools/services/PageService";
import {changeOnPage} from "../../../../tools/utils/func";
import {SettingsContext} from "../../../../context/settings";

const ButtonRoller = (props) => {

  const disableOn = props.disableOn

  let setElements = props.setElements

  let setIsSave = props.setIsSave

  let id = props.idEl

  let cond =  (disableOn !== undefined) ? disableOn : PageService.getPropsElement(id).visibleList

  const {settings,setSettings} = useContext(SettingsContext)



  let toggleVis = function (e){
    PageService.toggleVisibleListById(id, settings.autoFolding)
    changeOnPage(setElements,setIsSave)
  }

  return (
    <button className={cls.btn} onClick={(disableOn !== undefined) ? ()=>console.log("not work") : toggleVis}>
      <div className={cls.btnRoller + " " + ((!cond)?cls.btnRollerActive:null)}/>
    </button>
  );
};

export default ButtonRoller;