import React, {useContext, useEffect, useState} from 'react';
import ButtonOption from "../UI/ButtonToggleBool/ButtonOption/ButtonOption";
import {Link, useParams} from "react-router-dom";
import cls from "./Navbar.module.css"
import Server from "../../tools/services/Server";
import ButtonLink from "../UI/ButtonLink/ButtonLink";
import Loader from "../UI/Loader/Loader";
import {ThemeContext} from "../../context/theme";
import {Reorder} from "framer-motion";
import {AnimatePresence} from "framer-motion";
import imgSave from "../../img/menu.png";
import imgNotSave from "../../img/black-circle.png";
import {orderLinks} from "../../tools/globalConstants";

const Navbar = (props) => {

  let mod = props.mod
  let setMod = props.setMod
  const sidePanel = props.sidePanel

  let isSave = props.isSave
  let [isLoading,err] = props.isLoading

  const {lightTheme, setLightTheme} = useContext(ThemeContext)

  const varsAnimation = {
    initial: {
      opacity:0,
      height: 0,
    },
    animate:{
      opacity: 1,
      height: "auto"
    },
    exit:{
      opacity:0,
      height:0
    }
  }

  let arrLinks = props.links.map(link=>{
    return (
      <Reorder.Item key={link} value={link}
                    whileDrag={{
                      borderWidth:"2px",
                      borderColor:"rgb(255,0,0)",
                      borderStyle:"solid",
                    }}
                    {...varsAnimation}
      >
        <div className={cls.grab}>
          <span className={cls.save}>
            {isSave[link]
              ? <img src={imgSave} alt="☺" className={cls.saveIMG}/>
              : <img src={imgNotSave} alt="☻" className={cls.saveIMG}/>
            }
          </span>
          <Link to={"/page/" + link} style={{width:"100%"}}>
            <ButtonLink isSave={isSave}>{link}</ButtonLink>
          </Link>
        </div>

      </Reorder.Item>
    )
  })

  useEffect(()=>{
    let arr = props.links
    if(arr.length) localStorage.setItem(orderLinks, JSON.stringify(arr))
  }, [props.links])

  return (
      <div className={cls.nav + ` ${lightTheme?cls.lightNav:""} ${!sidePanel && cls.notSidePanel}`}>
        <div className={cls.navTitle}>Files</div>
        <div className={cls.navBody}>
          {err && "ERROR LOAD"}
          {isLoading
            ?<div className={cls.loaderBG}> <div className={cls.loader}><Loader/></div> </div>
            :<Reorder.Group as="div" axis="y" values={props.links} onReorder={props.setLinks}>
              <AnimatePresence>
                {arrLinks}
              </AnimatePresence>

            </Reorder.Group>
          }
        </div>
        <div className={cls.btnOptions}>
            <ButtonOption data={mod} setData={setMod}/>
        </div>

      </div>
  );
};

export default Navbar;