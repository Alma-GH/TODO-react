import React, {useContext} from 'react';
import Header from "../Header/Header";
import cls from "./Auth.module.css"
import clsHead from "../Header/Header.module.css"
import ButtonApply from "../UI/Apply/ButtonApply/ButtonApply";
import ButtonLink from "../UI/ButtonLink/ButtonLink";
import {Link, useParams} from "react-router-dom";
import {ThemeContext} from "../../context/theme";

const Auth = (props) => {

  const {lightTheme} = useContext(ThemeContext)

  return (
    <div style={{height:"100vh"}}>
      <div className={clsHead.head + ` ${clsHead.lightHead}`}>
        <div className={cls.right}>
          <Link to={"/auth/login"}>
            <ButtonLink >Login</ButtonLink>
          </Link>
          <Link to={"/auth/registration"}>
            <ButtonLink >Registration</ButtonLink>
          </Link>
        </div>
      </div>

      <div className={cls.center}>
        <div className={cls.form}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Auth;