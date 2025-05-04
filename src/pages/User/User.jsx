import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/auth/selectors.js";
import { logOutThunk } from "../../redux/auth/operations.js";
import { Navigate } from "react-router-dom";
import ModalProfile from "../../components/ModalProfile/ModalProfile.jsx";
import { useState } from "react";
import SideBar from "../../components/Sidebar/SideBar.jsx";
import MainPartPage from "../../components/MainPartPage/MainPartPage.jsx";
import s from './User.module.css';
import { getSelectedUser } from "../../redux/users/selectors.js";
import Chat from "../../components/Chat/Chat.jsx";

const User = () => {
      const [open,setOpen]=useState(false);
  const isSelected=useSelector(getSelectedUser);
      const handleOpenModal=()=>{
          setOpen(true);
      }
  const dispatch=useDispatch();
    const isLoggedInSel=useSelector(isLoggedIn);
if (!isLoggedInSel){
return <Navigate to='/'></Navigate>
}
  return (
    <>
 
    {isLoggedInSel && (
      
      <div>
         <button onClick={handleOpenModal}>Profile</button>
         <button onClick={()=>dispatch(logOutThunk())}>Log out</button>
      
      {open && <ModalProfile handleClose={() => setOpen(false)} />}
<div className={s.container}>
        <SideBar></SideBar>
        {isSelected ? <Chat></Chat>: <MainPartPage></MainPartPage>}
       
        </div>
     
      </div>
      
    )}
    </>
  )
 


   

};

export default User;
