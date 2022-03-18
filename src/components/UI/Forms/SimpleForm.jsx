import React from 'react';
import InputApply from "../Apply/InputApply/InputApply";
import Form from "./Form";

const SimpleForm = ({inputProps, btnFunc, btnName}) => {
  return (
    <Form btnFunc={btnFunc} btnName={btnName}>
      <InputApply {...inputProps}/>
    </Form>
  );
};

export default SimpleForm;