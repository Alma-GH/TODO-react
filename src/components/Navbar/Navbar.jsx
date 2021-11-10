import React from 'react';
import cls from "./Navbar.module.css"
import ButtonOption from "./ButtonOption/ButtonOption";
import {BrowserRouter, Link} from "react-router-dom";


const Navbar = (props) => {

  let arrLinks = props.links.map(link=>{
    return (
      <div>
        <Link to={"/page/" + link.name}>
          {link.name}
        </Link>
      </div>
    )
  })


  return (
      <div className={cls.nav}>
        {arrLinks}
        <ButtonOption cls="left"/>
        <ButtonOption cls="right"/>
      </div>
  );
};

export default Navbar;