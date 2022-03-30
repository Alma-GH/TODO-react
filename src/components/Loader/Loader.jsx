import React from 'react';
import cls from "./Loader.module.css"

const Loader = ({classBG,classWrap, styleBG, styleWrap}) => {

  let spin = cls.spinnerBox
  let circBorder = cls.circleBorder
  let circCore = cls.circleCore

  return (
    <div className={classBG} style={styleBG}>
      <div className={classWrap} style={styleWrap}>
        <div className={spin}>
          <div className={circBorder}>
            <div className={circCore}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;