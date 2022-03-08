import React from 'react';
import cls from "./Loader.module.css"

const Loader = () => {

  let spin = cls.spinnerBox
  let circBorder = cls.circleBorder
  let circCore = cls.circleCore

  return (

      <div className={spin}>
        <div className={circBorder}>
          <div className={circCore}></div>
        </div>
      </div>

  );
};

export default Loader;