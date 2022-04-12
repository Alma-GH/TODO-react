import React, {useContext, useState} from 'react';
import Form from "./Form";
import InputApply from "../Apply/InputApply/InputApply";
import {createUserWithEmailAndPassword, sendEmailVerification,
  signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth"
import {DatabaseContext} from "../../../context/db";
import cls from "../../UI/Forms/Form.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useFetching} from "../../../hooks/useFetching";

const AuthForm = ({reg}) => {


  const {auth} = useContext(DatabaseContext)

  const push = useNavigate()

  const [userN, setUserN] = useState("")
  const [pass, setPass] = useState("")
  const [fetchForm, loadForm, errForm,didMount] = useFetching(  async (isCreate)=>{
      let user

      if (isCreate) {
        ({user} = await createUserWithEmailAndPassword(auth, userN, pass))
        await sendEmailVerification(user)
      } else {
        ({user} = await signInWithEmailAndPassword(auth, userN, pass))
        push("/page")
      }
      console.log(auth)
      if(auth?.currentUser && !auth?.currentUser?.emailVerified) push("/auth/wait")


  })

  function sendForm(){
    fetchForm(reg)
  }

  const strErr = errForm?.code?.slice(errForm.code.indexOf("/") + 1).split("").map(ch => {
    if (ch === "-") return " "
    return ch
  }).join("")

  //for fix warning
  if(!didMount){
    return null
  }

  return (

    <Form btnFunc={sendForm} btnName={reg ? "CREATE" : "ENTER"} err={strErr} loading={loadForm}>
      <div className={cls.authForm}>
        <h1>{reg ? "Sign up" : "Sign in"}</h1>
        <InputApply type="text" autoComplete={reg ? "off" : "username"} value={userN}
                    onChange={(e) => setUserN(e.target.value)} placeholder="email"/>
        <InputApply type="password" autoComplete={reg ? "off" : "current-password"} value={pass}
                    onChange={(e) => setPass(e.target.value)} placeholder="password"/>

        <p>
          {reg
            ? <><Link className={cls.wrapLink} to={"/auth/login"}>
              Sign in!
            </Link> If you have account</>
            : <><Link className={cls.wrapLink} to={"/auth/registration"}>
              Sign up!
            </Link> If you don't have an account yet.</>
          }
        </p>
        {!reg && <p><Link className={cls.wrapLink} to={"/auth/newpass"}>CLICK!</Link> If you forgot password. </p>

        }
      </div>
    </Form>

  );
};

export default AuthForm;
