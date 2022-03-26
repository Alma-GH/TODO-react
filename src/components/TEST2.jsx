import React, {useState} from 'react';
import Test from "./TEST";


const Test2 = () => {

  let [state,setState] = useState("init")

  return (
    <div>
      <button onClick={()=>setState(state+"+")}>{state}</button>
      <Test init={state}/>
    </div>
  );
};

export default Test2;