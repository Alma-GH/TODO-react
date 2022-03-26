import React from 'react';
import InputApply from "../Apply/InputApply/InputApply";
import ButtonApply from "../Apply/ButtonApply/ButtonApply";
import cls from "./Form.module.css"
import Loader from "../Loader/Loader";

const Form = ({btnFunc, btnName, children, err, loading}) => {

  function submit(e) {
    e.preventDefault()
    if (btnFunc !== undefined) btnFunc()
  }

  return (
    <form action="" onSubmit={submit}>
      <div className={cls.form}>
        {loading &&
        <div className={cls.loaderBG}>
          <div className={cls.loader}>
            <Loader/>
          </div>
        </div>
        }
        {children}
        <div className={cls.error}>
          {err}
        </div>
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