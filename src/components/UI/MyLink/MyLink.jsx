import React, {useState} from 'react';
import cls from "../../Navbar/Navbar.module.css";
import imgSave from "../../../img_svg/menu.png";
import imgNotSave from "../../../img_svg/black-circle.png";
import {Link, useParams} from "react-router-dom";
import ButtonLink from "../ButtonLink/ButtonLink";

const MyLink = ({isSave,link, takeArr}) => {



  let styleLink = [cls.grab]
  if(takeArr[link]) styleLink.push(cls.take)


  return (
    <div className={styleLink.join(" ")}>
            <span className={cls.save}>
              {isSave[link]
                ? <img src={imgSave} alt="☺" className={cls.saveIMG}/>
                : <img src={imgNotSave} alt="☻" className={cls.saveIMG}/>
              }
            </span>
      <div className={cls.pageName}>
        <Link to={"/page/" + link}>
          <ButtonLink isSave={isSave}>{link}</ButtonLink>
        </Link>
      </div>

    </div>
  );
};

export default MyLink;