import React, {useState} from 'react';
import cls from "../../Navbar/Navbar.module.css";
import imgSave from "../../../img_svg/menu.png";
import imgNotSave from "../../../img_svg/black-circle.png";
import {NavLink} from "react-router-dom";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";

const MyLink = ({isSave,link}) => {


  const [active, setActive] = useState(null)


  const styleFunc = function ({isActive}){
    if(isActive) setTimeout(()=>setActive(true),0)
    else         setTimeout(()=>setActive(false),0)
  }

  let styleLink = [cls.grab]
  if(active) styleLink.push(cls.take)

  return (
    <div className={styleLink.join(" ")}>
      <span className={cls.save}>
        {isSave[link]
          ? <img src={imgSave} alt="☺" className={cls.saveIMG}/>
          : <img src={imgNotSave} alt="☻" className={cls.saveIMG}/>
        }
      </span>
      <div className={cls.pageName}>
        <NavLink className={styleFunc} to={"/page/" + encodeURI(link)}>
          <ButtonLink isSave={isSave}>{link}</ButtonLink>
        </NavLink>
      </div>
    </div>
  );
};

export default MyLink;