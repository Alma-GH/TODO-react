import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import cls from "../../UI/Forms/Form.module.css";
import {sendEmailVerification} from "firebase/auth";
import {DatabaseContext} from "../../../context/db";

const AuthWait = () => {

  const {auth} = useContext(DatabaseContext)

  function sendVerif(){
    sendEmailVerification(auth?.currentUser)
  }

  return (
    <div style={{width:"400px"}}>
      <p>
        Please reload page when you confirm your email.
        <br/>
        <br/>
        <Link className={cls.wrapLink} to={"/auth/login"} onClick={sendVerif}> CLICK! </Link>
        for send confirm again

      </p>

    </div>
  );
};

export default AuthWait;