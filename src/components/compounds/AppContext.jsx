import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/auth";
import {SettingsContext} from "../../context/settings";
import {ThemeContext} from "../../context/theme";
import Server from "../../tools/services/Server";
import {DatabaseContext} from "../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";


const AppContext = (props) => {

  const {auth,db} = useContext(DatabaseContext)
  const [user] = useAuthState(auth)

  const [lightTheme, setLightTheme] = useState(null)
  const [settings, setSettings] = useState({
    autoFolding: true,
    autoFilling: true,
  })


  useEffect(() => {

    async function func() {
      //settings
      let newSettings = await Server.getSettings(db,user.uid)
      setSettings(newSettings)

      //theme
      let newTheme = await Server.getTheme(db,user.uid)
      setLightTheme(newTheme)
    }

    func()
      .catch(err => console.log(err.message))

  }, [])

  return (
      <SettingsContext.Provider value={{
        settings,
        setSettings
      }}>
        <ThemeContext.Provider value={{
          lightTheme,
          setLightTheme
        }}>
          {props.children}
        </ThemeContext.Provider>
      </SettingsContext.Provider>
  );
};

export default AppContext;