import React from 'react';
import ButtonOption from "./UI/ButtonOption/ButtonOption";
import {Link} from "react-router-dom";


const Navbar = (props) => {

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
        <div className="options">
          <ButtonOption cls="left"/>
          <ButtonOption cls="right"/>
        </div>

      </div>
  );
};

export default Navbar;