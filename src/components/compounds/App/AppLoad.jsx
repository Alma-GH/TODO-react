import React from 'react';
import Loader from "../../Loader/Loader";


const AppLoad = () => {
  return (
        <Loader styleBG={{display:"grid", placeItems:"center", height:"100%", backgroundColor:"#1d2630"}}
                styleWrap={{width:"30%", aspectRatio:"1/1"}}/>
  );
};

export default AppLoad;