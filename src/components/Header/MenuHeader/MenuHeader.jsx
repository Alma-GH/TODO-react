import React, {useState} from 'react';
import cls from "./MenuHeader.module.css"

const MenuHeader = (props) => {

  let [isShow, setIsShow] = useState(null)

  function showMenu(){
    setIsShow(true)
  }

  function hideMenu(){
    setIsShow(false)
  }


  return (
    <div onMouseOver={showMenu} onMouseLeave={hideMenu}>
      <div className={cls.popUp} >
        {props.name}
      </div>
      {isShow
        ? <div className={cls.menu} onClick={hideMenu}>{props.children}</div>
        : ""
      }
    </div>


  );
};

export default MenuHeader;