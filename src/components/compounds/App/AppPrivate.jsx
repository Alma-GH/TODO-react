import React, {useContext, useEffect, useState} from 'react';
import AppMain from "./AppMain";
import {useFetching} from "../../../hooks/useFetching";
import {defaultSettings, orderLinks} from "../../../tools/globalConstants";
import SaveService from "../../../tools/services/SaveService";
import Server from "../../../tools/services/Server";
import {DatabaseContext} from "../../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";
import {updateOrderThrottle} from "../../../tools/utils/wrappers";
import AppLoad from "./AppLoad";
import AppContext from "./AppContext";

const AppPrivate = () => {

  //auth data
  const {auth,db} = useContext(DatabaseContext)
  const [user] = useAuthState(auth)

  //context
  const [lightTheme, setLightTheme] = useState(null)
  const [settings, setSettings] = useState(defaultSettings)
  const [isOnPage, setIsOnPage] = useState(false)

  //store
  const [pages, setPages] = useState([])


  const [isGetData, setIsGetData] = useState(false)
  const [optionMod, setOptionMod] = useState(false)
  const [act, setAct] = useState(null)
  const [sound, setSound] = useState(false)

  const [sidePanel, setSidePanel] = useState(true)
  const [isSave, setSave] = useState(null)


  const [fetchPagesNames, isNamesLoading, errNames] = useFetching(async () => {

    SaveService.init()

    await Server.getAllNameFiles(db,user.uid)
    let parse = JSON.parse(localStorage.getItem(orderLinks))
    setSave(Object.fromEntries(parse.map(e => [e, true])))
    setPages(parse)

  })

  //set settings and names of pages
  useEffect(() => {

    async function func() {
      //page names
      await fetchPagesNames()

      //settings
      let newSettings = await Server.getSettings(db,user.uid)
      setSettings(newSettings)
    }

    func()
      .then(()=>setIsGetData(true))
      .catch(err => console.log(err.message))

  }, [])

  //set theme
  useEffect(()=>{
    async function loadTheme(){
      //theme
      if(user === null) setLightTheme(null)
      else{
        let newTheme = await Server.getTheme(db,user.uid)
        setLightTheme(newTheme)
      }

    }
    loadTheme()
      .catch(e=>{console.log(e.message); setLightTheme(false)})
  },[user,db])


  //save order
  useEffect(()=>{

    if(isGetData){
      localStorage.setItem(orderLinks, JSON.stringify(pages))
      updateOrderThrottle(db,user.uid)
        .catch(e=>console.log(e.message))
    }
  }, [pages])

  //warning window
  useEffect(()=>{

    function question(event){
      event.preventDefault();
      event.returnValue = '';
    }

    function event(){
      if(isSave === null) return
      let f = false
      for(let page in isSave){
        if(!isSave[page]) f = true
      }
      if(f){
        window.addEventListener('beforeunload', question);
      }
    }
    event()
    return ()=>window.removeEventListener("beforeunload",question)
  }, [isSave])



  if(lightTheme===null) return <AppLoad/>

  return (
    <AppContext
      lightTheme={lightTheme} setLightTheme={setLightTheme}
      settings={settings} setSettings={setSettings}
      isOnPage={isOnPage} setIsOnPage={setIsOnPage}
    >
      <AppMain pages={pages} setPages={setPages}
               optionMod={optionMod} setOptionMod={setOptionMod}
               act={act} setAct={setAct}
               sidePanel={sidePanel} setSidePanel={setSidePanel}
               sound={sound} setSound={setSound}
               isSave={isSave} setSave={setSave}
               isNamesLoading={isNamesLoading} errNames={errNames}
      />
    </AppContext>
  );
};

export default AppPrivate;