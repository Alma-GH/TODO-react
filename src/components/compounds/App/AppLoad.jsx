import React from 'react';
import Loader from "../../UI/Loader/Loader";

const AppLoad = () => {
  return (
    <div style={{display:"grid", placeItems:"center", height:"100%", backgroundColor:"#1d2630"}}>
      <div style={{width:"30%", aspectRatio:"1/1"}}>
        <Loader/>
      </div>
    </div>
  );
};

export default AppLoad;