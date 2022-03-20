import React, {useContext, useEffect, useState} from 'react';
import AppMain from "./AppMain";
import AppLoad from "./AppLoad";
import {useFetching} from "../../hooks/useFetching";
import {example, orderLinks} from "../../tools/globalConstants";
import SaveService from "../../tools/services/SaveService";
import Server from "../../tools/services/Server";
import {ThemeContext} from "../../context/theme";
import {SettingsContext} from "../../context/settings";

const AppPrivate = () => {

  const {setSettings} = useContext(SettingsContext)

  const [pages, setPages] = useState([])
  const [optionMod, setOptionMod] = useState(false)
  const [act, setAct] = useState(null)
  const [sound, setSound] = useState(false)

  const [sidePanel, setSidePanel] = useState(true)
  const [takeArr, setTakeArr] = useState(null)

  const [isSave, setSave] = useState(null)
  const [fetchPagesNames, isNamesLoading, errNames] = useFetching(async () => {
    if (send) {
      fetch("https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(example)
      })
        .then(response => response.json())
        .then(res => console.log("res from BD:", res))
    }

    SaveService.init()


    await Server.getAllNameFiles()
    let parse = JSON.parse(localStorage.getItem(orderLinks))
    setSave(Object.fromEntries(parse.map(e => [e, true])))
    setPages(parse)

  })

  let send = false

  useEffect(() => {

    async function func() {
      //page names
      await fetchPagesNames()

      //settings
      let newSettings = await Server.getSettings()
      setSettings(newSettings)
    }

    func()
      .catch(err => console.log(err.message))

  }, [])

  useEffect(()=>{

    function event(){
      if(isSave === null) return
      let f = false
      for(let page in isSave){
        if(!isSave[page]) f = true
      }
      if(f){
        window.onbeforeunload = function() {
          return false;
        };
      }
    }
    event()

  }, [isSave])


  return (
        <AppMain pages={pages} setPages={setPages}
                   optionMod={optionMod} setOptionMod={setOptionMod}
                   act={act} setAct={setAct}
                   sidePanel={sidePanel} setSidePanel={setSidePanel}
                   sound={sound} setSound={setSound}
                   takeArr={takeArr} setTakeArr={setTakeArr}
                   isSave={isSave} setSave={setSave}
                   isNamesLoading={isNamesLoading} errNames={errNames}
        />
  );
};

export default AppPrivate;