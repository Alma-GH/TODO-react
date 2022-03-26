import React from 'react';
import cls from "../../Header/Header.module.css";
import Loader from "../../UI/Loader/Loader";

const HeaderNotification = ({isCreating, isRenaming, isDeleting, isSaving,
                            errRename,errSave,errDelete,errCreate}) => {


  return (
    <>
      {(isCreating || isRenaming || isDeleting || isSaving) &&
      <div className={cls.loader}><Loader/></div>
      }
      {(errRename || errSave || errDelete || errCreate) &&
      <div className={cls.error}>HAVE PROBLEM</div>
      }
    </>
  );
};

export default HeaderNotification;