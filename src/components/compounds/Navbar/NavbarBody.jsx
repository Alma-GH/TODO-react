import React from 'react';
import cls from "../../Navbar/Navbar.module.css";
import Loader from "../../Loader/Loader";
import {AnimatePresence, Reorder} from "framer-motion";

const NavbarBody = ({err,isLoading,links,setLinks,children}) => {


  return (
    <div className={cls.navBody}>
      {err && "ERROR LOAD"}
      {isLoading
        ?<Loader classBG={cls.loaderBG} classWrap={cls.loader}/>
        :<Reorder.Group as="div" axis="y" values={links} onReorder={setLinks}>
          <AnimatePresence>
            {children}
          </AnimatePresence>

        </Reorder.Group>
      }
    </div>
  );
};

export default NavbarBody;