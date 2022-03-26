import React from 'react';
import {Reorder} from "framer-motion";
import MyLink from "../../UI/MyLink/MyLink";

const NavbarItem = ({link,isSave}) => {

  const varsAnimation = {
    initial: {
      opacity:0,
      height: 0,
    },
    animate:{
      opacity: 1,
      height: "auto"
    },
    exit:{
      opacity:0,
      height:0
    }
  }
  const stylesWhileDrag = {
    // outline:"2px",
    // outlineColor:"blue",
    // outlineStyle:"solid"
  }

  return (
    <Reorder.Item value={link}
                  whileDrag={stylesWhileDrag}
                  {...varsAnimation}
    >
      <MyLink link={link} isSave={isSave}/>
    </Reorder.Item>
  );
};

export default NavbarItem;