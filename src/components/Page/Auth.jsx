import React, {useContext} from 'react';
import Header from "../Header/Header";
import cls from "./Auth.module.css"
import clsHead from "../Header/Header.module.css"
import clsModal from "../UI/Modal/Modal.module.css"
import ButtonApply from "../UI/Apply/ButtonApply/ButtonApply";
import ButtonLink from "../UI/ButtonLink/ButtonLink";
import {Link, useParams} from "react-router-dom";
import {ThemeContext} from "../../context/theme";

const Auth = (props) => {

  const {lightTheme} = useContext(ThemeContext)

  return (
    <div className={`${clsModal.modal} ${cls.authPage} ${clsModal.active}`}>
      {/*<div className={clsHead.head}>*/}
      {/*  <div className={cls.right}>*/}

      {/*      <Link className={cls.wrapLink} to={"/auth/login"}>*/}
      {/*        <ButtonLink >Login</ButtonLink>*/}
      {/*      </Link>*/}
      {/*      <Link className={cls.wrapLink} to={"/auth/registration"}>*/}
      {/*        <ButtonLink >Registration</ButtonLink>*/}
      {/*      </Link>*/}

      {/*  </div>*/}
      {/*</div>*/}

      <div className={`${clsModal.modalContent} ${cls.authContent}`}>
          {props.children}
      </div>
    </div>
  );
};

export default Auth;