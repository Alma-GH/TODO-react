import React from 'react';
import cls from "./MainPage.module.css"

const MainPage = () => {
  return (
    <div className={cls.main} onMouseDown={e=>e.preventDefault()}>
      <div>
        <p>There's nothing here!</p>
        <p>For start:</p>
        <p>About -> how work</p>
      </div>
    </div>
  );
};

export default MainPage;