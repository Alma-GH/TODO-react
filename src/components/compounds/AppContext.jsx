import React, {useEffect, useState} from 'react';
import {AuthContext} from "../../context/auth";
import {SettingsContext} from "../../context/settings";
import {ThemeContext} from "../../context/theme";
import Server from "../../tools/services/Server";


const AppContext = (props) => {

  const [isAuth, setIsAuth] = useState(null)
  const [lightTheme, setLightTheme] = useState(null)
  const [settings, setSettings] = useState({
    autoFolding: true,
    autoFilling: true,
  })


  useEffect(() => {

    async function func() {
      //settings
      let newSettings = await Server.getSettings()
      setSettings(newSettings)

      //theme
      let newTheme = await Server.getTheme()
      setLightTheme(newTheme)
    }

    func()
      .catch(err => console.log(err.message))

  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
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
    </AuthContext.Provider>
  );
};

export default AppContext;