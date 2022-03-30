import React from 'react';
import cls from "../../Header/Header.module.css";
import Loader from "../../Loader/Loader";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const HeaderNotification = ({isCreating, isRenaming, isDeleting, isSaving,
                            errRename,errSave,errDelete,errCreate}) => {


  return (
    <>
      {(isCreating || isRenaming || isDeleting || isSaving) &&
      <Loader classWrap={cls.loader}/>
      }
      {(errRename || errSave || errDelete || errCreate) &&
      <ErrorMessage addClass={cls.error}>HAVE PROBLEM</ErrorMessage>
      }
    </>
  );
};

export default HeaderNotification;