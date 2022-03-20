import React, {useContext, useState} from 'react';
import Form from "./Form";
import InputApply from "../Apply/InputApply/InputApply";
import {AuthContext} from "../../../context/auth";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {DatabaseContext} from "../../../context/db";

const AuthForm = ({reg}) => {

  const {auth} = useContext(DatabaseContext)


  const [userN, setUserN] = useState("")
  const [pass, setPass]   = useState("")
  const [err, setErr] = useState("")

  async function enter(){
    // console.log("enter")
    // setIsAuth(true)
    // localStorage.setItem("auth", "true")
    try{
      let {user} = await signInWithEmailAndPassword(auth, userN, pass)
      console.log(user)
    }catch (e){
      setErr(e.code)
      console.log(e.message)
    }


  }

  async function createAc(){
    try{
      let {user} = await createUserWithEmailAndPassword(auth,userN,pass)
      console.log(user)
    }catch (e){
      setErr(e.code)
      console.log(e.message)
    }
  }

  return (
    <Form btnFunc={reg?createAc:enter} btnName={"ENTER"}>
      <h1>{reg?"Register":"Login"}</h1>
      <InputApply type="text" autoComplete={reg?"off":"username"} value={userN} onChange={(e)=>setUserN(e.target.value)} placeholder="email"/>
      <InputApply type="password" autoComplete={reg?"off":"current-password"} value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="password"/>
      <div>
        {err}
      </div>

    </Form>
  );
};

export default AuthForm;
