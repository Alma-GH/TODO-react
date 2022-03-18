import React, {useContext, useState} from 'react';
import Form from "./Form";
import InputApply from "../Apply/InputApply/InputApply";
import {AuthContext} from "../../../context/auth";

const AuthForm = ({reg}) => {

  const {isAuth, setIsAuth} = useContext(AuthContext)
  const [userN, setUserN] = useState("")
  const [pass, setPass]   = useState("")

  function enter(){
    console.log("enter")
    setIsAuth(true)
  }

  return (
    <Form btnFunc={enter} btnName={"ENTER"}>
      <h1>{reg?"Register":"Login"}</h1>
      <InputApply type="text" value={userN} onChange={(e)=>setUserN(e.target.value)} placeholder="username"/>
      <InputApply type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="password"/>
    </Form>
  );
};

export default AuthForm;
