import React, {useState} from 'react';
import ButtonOption from "../UI/ButtonOption/ButtonOption";
import {Link, useParams} from "react-router-dom";
import cls from "./Navbar.module.css"
import Server from "../../tools/services/Server";
import ButtonLink from "../UI/ButtonLink/ButtonLink";
import Loader from "../UI/Loader/Loader";

const Navbar = (props) => {

  let mod = props.mod
  let setMod = props.setMod

  let isSave = props.isSave
  let [isLoading,err] = props.isLoading

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
      <div className={cls.nav}>
        <div className={cls.navTitle}>Files</div>
        {err && "ERROR LOAD"}
        {isLoading
          ?<div className={cls.loaderBG}> <div className={cls.loader}><Loader/></div> </div>
          :arrLinks
        }
        <div className={cls.btnOptions}>
            <ButtonOption data={mod} setData={setMod}/>
        </div>

      </div>
  );
};

export default Navbar;