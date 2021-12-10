import React from 'react';
import ButtonOption from "./UI/ButtonOption/ButtonOption";
import {Link} from "react-router-dom";


const Navbar = (props) => {

  let mod = props.mod
  let setMod = props.setMod

  let changeMod = function (){
    setMod(!mod)
  }

  let arrLinks = props.links.map(link=>{
    return (
      <div key={link.name}>
        <Link to={"/page/" + link.name}>
          {link.name}
        </Link>
      </div>
    )
  })


  return (
      <div className="nav">
        <div className="navTitle">Files</div>
        {arrLinks}
        <div className="btnOptions">
          <ButtonOption callback={()=>changeMod()}/>
          <ButtonOption />
        </div>

      </div>
  );
};

export default Navbar;