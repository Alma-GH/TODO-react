import React, {useState} from 'react';
import ButtonOption from "../UI/ButtonOption/ButtonOption";
import {Link} from "react-router-dom";
import cls from "./Navbar.module.css"

const Navbar = (props) => {

  let mod = props.mod
  let setMod = props.setMod

  let arrLinks = props.links.map(link=>{
    return (
      <div key={link}>
        <Link to={"/page/" + link}>
          {link}
        </Link>
      </div>
    )
  })


  return (
      <div className={cls.nav}>
        <div className={cls.navTitle}>Files</div>
        {arrLinks}
        <div className={cls.btnOptions}>
            <ButtonOption data={mod} setData={setMod}/>
        </div>

      </div>
  );
};

export default Navbar;