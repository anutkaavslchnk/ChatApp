import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/auth/selectors.js";
import { logOutThunk } from "../../redux/auth/operations.js";
import { Navigate } from "react-router-dom";


const User = () => {
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
      <button onClick={()=>dispatch(logOutThunk())}>Log out</button>
      </div>
    )}
    </>
  )
 


   

};

export default User;
