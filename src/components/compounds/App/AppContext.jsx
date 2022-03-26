import React from 'react';
import {SettingsContext} from "../../../context/settings";
import {ThemeContext} from "../../../context/theme";


const AppContext = ({children, lightTheme, setLightTheme,
                    settings, setSettings}) => {


  return (
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
  );
};

export default AppContext;