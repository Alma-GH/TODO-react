import React, {useContext, useState} from 'react';
import ButtonOption from "../UI/ButtonOption/ButtonOption";
import {Link, useParams} from "react-router-dom";
import cls from "./Navbar.module.css"
import Server from "../../tools/services/Server";
import ButtonLink from "../UI/ButtonLink/ButtonLink";
import Loader from "../UI/Loader/Loader";
import {ThemeContext} from "../../context/theme";

const Navbar = (props) => {

  let mod = props.mod
  let setMod = props.setMod

  let isSave = props.isSave
  let [isLoading,err] = props.isLoading

  const {lightTheme, setLightTheme} = useContext(ThemeContext)

  let arrLinks = props.links.map(link=>{
    return (
      <div key={link}>
        <Link to={"/page/" + link}>
          <ButtonLink isSave={isSave}>{link}</ButtonLink>
        </Link>
      </div>
    )
  })


  return (
      <div className={cls.nav + ` ${lightTheme?cls.lightNav:""}`}>
        <div className={cls.navTitle}>Files</div>
        <div className={cls.navBody}>
          {err && "ERROR LOAD"}
          {isLoading
            ?<div className={cls.loaderBG}> <div className={cls.loader}><Loader/></div> </div>
            :arrLinks
          }
        </div>
        <div className={cls.btnOptions}>
            <ButtonOption data={mod} setData={setMod}/>
        </div>

      </div>
  );
};

export default Navbar;