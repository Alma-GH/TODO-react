import React, {useState} from 'react';

const Test = ({init}) => {

  let [state,setState] = useState(init)

  return (
    <div>
      {state}
    </div>
  );
};

export default Test;