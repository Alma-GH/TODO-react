import React, {useState} from 'react';
import InputApply from "../Apply/InputApply/InputApply";
import Form from "./Form";
import cls from "./Form.module.css"

const SimpleForm = ({inputProps, btnFunc, btnName,err, loading}) => {

  return (
    <Form btnFunc={btnFunc} btnName={btnName} err={err} loading={loading}>
        <InputApply {...inputProps}/>
    </Form>
  );
};

export default SimpleForm;