import React, {useContext, useState} from 'react';
import SimpleForm from "../UI/Forms/SimpleForm";
import {sendPasswordResetEmail} from "firebase/auth";
import {useFetching} from "../../hooks/useFetching";
import {DatabaseContext} from "../../context/db";
import {useNavigate} from "react-router-dom";
import cls from "./../UI/Forms/Form.module.css"
import Loader from "../Loader/Loader";

const AuthNewPass = () => {

  const {auth} = useContext(DatabaseContext)
  const [email, setEmail] = useState("")

  const push = useNavigate()

  const [fetchPass, load, err] = useFetching(async ()=>{
    await sendPasswordResetEmail(auth, email)
    console.log("newPass")
    push("/auth/login")
  })

  const strErr = err?.code?.slice(err.code.indexOf("/") + 1).split("").map(ch => {
    if (ch === "-") return " "
    return ch
  }).join("")

  function inputEmail(e){
    setEmail(e.target.value)
  }

  return (
      <SimpleForm inputProps={{
        value:email, type:"text",
        onChange:inputEmail, placeholder:"email"
      }} btnName={"SEND"} btnFunc={fetchPass} err={strErr} loading={load}/>
  );
};

export default AuthNewPass;