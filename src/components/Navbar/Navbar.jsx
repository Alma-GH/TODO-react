import React, {useContext, useEffect, useState} from 'react';
import ButtonOption from "../UI/ButtonToggleBool/ButtonOption/ButtonOption";
import cls from "./Navbar.module.css"
import Loader from "../UI/Loader/Loader";
import {ThemeContext} from "../../context/theme";
import {AnimatePresence, Reorder} from "framer-motion";
import {orderLinks} from "../../tools/globalConstants";
import MyLink from "../UI/MyLink/MyLink";
import PageService from "../../tools/services/PageService";

const Navbar = (props) => {

  let mod = props.mod
  let setMod = props.setMod
  const sidePanel = props.sidePanel

  let isSave = props.isSave
  let [isLoading,err] = props.isLoading

  let takeArr = props.takeArr

  const {lightTheme} = useContext(ThemeContext)
  let style = [cls.nav]
  if(!sidePanel) style.push(cls.notSidePanel)
  if(lightTheme) style.push(cls.lightNav)

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
                      // outline:"2px",
                      // outlineColor:"blue",
                      // outlineStyle:"solid"
                    }}
                    {...varsAnimation}
      >
        <MyLink link={link} isSave={isSave} takeArr={takeArr}/>
      </Reorder.Item>
    )
  })

  useEffect(()=>{
    let arr = props.links
    if(arr.length) localStorage.setItem(orderLinks, JSON.stringify(arr))
  }, [props.links])

  return (
      <div className={style.join(" ")}>
        {/*<div className={cls.navTitle}>Files</div>*/}
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
        <div className={cls.wrapBtnOptions}>
          <div className={cls.btnOptions}>
            <ButtonOption data={mod} setData={setMod}/>
          </div>
        </div>


      </div>
  );
};

export default Navbar;