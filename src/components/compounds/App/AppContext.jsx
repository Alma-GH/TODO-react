import React from 'react';
import {SettingsContext} from "../../../context/settings";
import {ThemeContext} from "../../../context/theme";
import {OnPageContext} from "../../../context/onPage";


const AppContext = ({children,
                      lightTheme, setLightTheme,
                      settings, setSettings,
                      isOnPage,setIsOnPage}) => {


  return (
    <OnPageContext.Provider value={{
      isOnPage,
      setIsOnPage
    }}>
      <SettingsContext.Provider value={{
        settings,
        setSettings
      }}>
        <ThemeContext.Provider value={{
          lightTheme,
          setLightTheme
        }}>
          {children}
        </ThemeContext.Provider>
      </SettingsContext.Provider>
    </OnPageContext.Provider>
  );
};

export default AppContext;