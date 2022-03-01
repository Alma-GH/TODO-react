import React from 'react';
import cls from "./Form.module.css";
import ButtonApply from "../Apply/ButtonApply/ButtonApply";

const Confirm = ({btnFuncYES,btnFuncNO, question}) => {
  return (
    <div className={cls.form}>
      <div>
        {question}
      </div>
      <div className={cls.btnsCont}>
        <ButtonApply func={btnFuncYES}>
          YES
        </ButtonApply>
        <ButtonApply func={btnFuncNO}>
          NO
        </ButtonApply>
      </div>

    </div>
  );
};

export default Confirm;