import React from 'react';
import InputApply from "../Apply/InputApply/InputApply";
import ButtonApply from "../Apply/ButtonApply/ButtonApply";
import cls from "./Form.module.css"
import Loader from "../../Loader/Loader";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const Form = ({btnFunc, btnName, children, err, loading}) => {

  function submit(e) {
    e.preventDefault()
    if (btnFunc !== undefined) btnFunc()
  }

  return (
    <form action="" onSubmit={submit}>
      <div className={cls.form}>
        {loading &&
            <Loader classWrap={cls.loader} classBG={cls.loaderBG}/>
        }
        {children}

        <ErrorMessage addClass={cls.error}>
          {err}
        </ErrorMessage>

        <div className={cls.btnCont}>
          <ButtonApply>
            {btnName}
          </ButtonApply>
        </div>


      </div>
    </form>

  );
};

export default Form;