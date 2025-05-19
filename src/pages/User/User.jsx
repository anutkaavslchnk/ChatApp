import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/auth/selectors.js";

import { Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/SideBar.jsx";
import MainPartPage from "../../components/MainPartPage/MainPartPage.jsx";
import s from './User.module.css';
import { getSelectedUser } from "../../redux/users/selectors.js";
import Chat from "../../components/Chat/Chat.jsx";
import { clearSelectedUser } from "../../redux/users/slice.js";
import svg from '/public/vite.svg';
const User = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1158);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1158);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const isSelected=useSelector(getSelectedUser);

  const dispatch=useDispatch();
    const isLoggedInSel=useSelector(isLoggedIn);
if (!isLoggedInSel){
return <Navigate to='/'></Navigate>
}

  return (
    <>
 
    {isLoggedInSel && (
      
      <div>

      {isMobile && isSelected && (
          <button className={s.backBtn} onClick={() => dispatch(clearSelectedUser())}>
            <svg width='32px' height='32px'>
              <use href={`${svg}#back`}></use>
            </svg>
          </button>
        )}

<div className={s.container}>

  {(!isMobile || (isMobile && !isSelected)) && <SideBar />}

  <div className={isSelected ? s.chatVisible : s.chat}>
    {isSelected ? <Chat /> : <MainPartPage />}
  </div>

      
       
       
        </div>
     
      </div>
      
    )}
    </>
  )
 


   

};

export default User;
