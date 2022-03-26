import React from 'react';
import cls from "../../Page/PageStructure/Element.module.css";
import Description from "../../Page/PageStructure/Description";

const ElementAddition = ({vis,elemProps, isSchedule, elemDesc, setElemDesc,pageElements, setPageElements, mod, setIsSave}) => {
  return (
    <div className={cls.descBlock}>
      {(vis === false) && <div className={cls.threePoint}> <p>•••</p> </div>}

      {("description" in elemProps) &&
        <Description isSchedule={isSchedule} elem={elemProps} elemDesc={elemDesc} setElemDesc={setElemDesc}
                     pageElements={pageElements} setPageElements={setPageElements} mod={mod} setIsSave={setIsSave}/>
      }
    </div>
  );
};

export default ElementAddition;