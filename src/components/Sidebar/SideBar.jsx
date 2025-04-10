import { useDispatch, useSelector } from "react-redux";
import s  from "./SideBar.module.css";
import avatar from "/public/user.png";
import { getAllUsers } from "../../redux/users/operations.js";
import { useEffect, useState} from "react";
import { getUsersSelector } from "../../redux/users/selectors.js";
import { selectedUser } from "../../redux/users/slice.js";
import { getOnlineUsers } from "../../redux/socket/selectors.js";

const SideBar = () => {

    const dispatch = useDispatch();
const online =useSelector(getOnlineUsers);
    
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const users = useSelector(getUsersSelector); 



    if (!Array.isArray(users) || users.length === 0) {
        return <p>Loading users...</p>; 
    }

    return (
        <div className={s.cont}>
           
            <ul  className={s.list}>
                {users.map((user) => {
const isOnline = online.includes(user._id);
return(

    <li className={s.item} key={user._id} onClick={()=>dispatch(selectedUser(user))}>
        
        <div className={s.avatarWrapper}>
                <img
                    className={s.img}
                    src={user.profileAvatar || avatar}
                    alt="avatar"
                />
                {isOnline && <span className={s.onlineDot}></span>}
            </div>
        <p>{user.fullName}</p>
</li>
   )
                }      
                )}
            </ul>
        </div>
    );
};

export default SideBar;