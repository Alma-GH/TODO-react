import React from 'react';
import Timer from "../UI/Timer/Timer";
import ButtonHeader from "../UI/ButtonHeader/ButtonHeader";

const Header = () => {
  return (
    <div className="head">
      <Timer/>
      <ButtonHeader/>
      <ButtonHeader/>
      <ButtonHeader/>
    </div>
  );
};

export default Header;