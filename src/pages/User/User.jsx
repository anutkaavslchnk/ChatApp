import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/auth/selectors.js";
import { logOutThunk } from "../../redux/auth/operations.js";
import { Navigate } from "react-router-dom";
import ModalProfile from "../../components/ModalProfile/ModalProfile.jsx";
import { useState } from "react";


const User = () => {
      const [open,setOpen]=useState(false);
  
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
      <p>Hello, new user!</p>
      <button onClick={handleOpenModal}>Profile</button>
      <button onClick={()=>dispatch(logOutThunk())}>Log out</button>
      {open && <ModalProfile handleClose={() => setOpen(false)} />}
      </div>
    )}
    </>
  )
 


   

};

export default User;
