import React, {useContext, useState} from 'react';
import cls from "./MenuHeader.module.css"
import {ThemeContext} from "../../../context/theme";

const MenuHeader = (props) => {

  let [isShow, setIsShow] = useState(null)

  const {lightTheme} = useContext(ThemeContext)
  let style = [cls.popUp]


  if(lightTheme) style.push(cls.lightPopUp)

  function showMenu(){
    setIsShow(true)
  }

  function hideMenu(){
    setIsShow(false)
  }


  return (
    <div onMouseOver={showMenu} onMouseLeave={hideMenu} className={props.className}>
      <div className={style.join(" ")} >
        {props.name}
      </div>

      {isShow &&
        <div className={cls.menu} onClick={hideMenu}>
          {props.children}
        </div>
      }
    </div>


  );
};

export default MenuHeader;