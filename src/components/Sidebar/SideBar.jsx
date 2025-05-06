import { useDispatch, useSelector } from "react-redux";
import s from "./SideBar.module.css";
import avatar from "/public/user.png";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../redux/users/operations.js";
import {  getSelectedUser, getUsersSelector } from "../../redux/users/selectors.js";
import { selectedUser } from "../../redux/users/slice.js";
import { getOnlineUsers, isTyping } from "../../redux/socket/selectors.js";
import { getMessages } from "../../redux/messages/operations.js";
import { getCurrentUser } from "../../redux/auth/selectors.js";
import { getConversationSummaries } from "../../redux/messages/selectors.js";
import { logOutThunk } from "../../redux/auth/operations.js";
import ModalProfile from "../ModalProfile/ModalProfile.jsx";
import icons from '/public/vite.svg';
const SideBar = () => {
          const [open,setOpen]=useState(false);
  
          const handleOpenModal=()=>{
              setOpen(true);
          }
    const dispatch = useDispatch();

    const users = useSelector(getUsersSelector);
    const onlineUsers = useSelector(getOnlineUsers);
    const typingUsers = useSelector(isTyping);
    const currentUser = useSelector(getCurrentUser);
    const conversationSummaries = useSelector(state => getConversationSummaries(state, currentUser._id));
    // ...
    useEffect(() => {
        dispatch(getAllUsers());
        
    }, [dispatch]);

    if (!Array.isArray(users) || users.length === 0) {
        return <p>Loading users...</p>;
    }

    return (
        <div className={s.cont}>
            <p className={s.chats_title}>Chats</p>
            <ul className={s.list}>
                {users.map((user) => {
                    const isOnline = onlineUsers.includes(user._id);
                    const isUserTyping = typingUsers.includes(user._id);
                    const summary = conversationSummaries[user._id] || {};
                    const lastMsg = summary.lastMessage?.txt || "";
                    const unreadCount = summary.unreadCount || 0;
                    return (
                        <li
                            className={s.item}
                            key={user._id}
                            onClick={() => {
                                dispatch(selectedUser(user));
                                dispatch(getMessages());
                            }}
                        >
                            <div className={s.avatarWrapper}>
                                <img
                                    className={s.img}
                                    src={user.profileAvatar || avatar}
                                    alt="avatar"
                                />
                                {isOnline && <span className={s.onlineDot}></span>}
                            </div>

                            <div className={s.infoWrapper}>
                                <div className={s.nameRow}>
                                    <p className={s.userName}>{user.fullName}</p>
                                    {unreadCount > 0 && (
                                        <span className={s.unreadCount}>{unreadCount}</span>
                                    )}
                                </div>

                                {isUserTyping ? (
                                    <p className={s.typing}>Typing...</p>
                                ) : (
                                    <p className={s.lastMsg}>{lastMsg}</p>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className={s.settings_container}>
            <button className={s.btn_profile} onClick={handleOpenModal}>
                    <div className={s.circle_profile}></div>
                    <p className={s.btn_txt}>Profile</p></button>
                 <button className={s.btn_profile} onClick={()=>dispatch(logOutThunk())}>
                 <svg width="30" height="30">
                        <use href={`${icons}#logout`} ></use>
                    </svg>
                    <p className={s.btn_txt}>Log out</p>
                    </button>
                    <button className={s.btn_profile} >
                 <svg width="30px" height="30px">
                        <use href={`${icons}#settings`} ></use>
                    </svg>
                    <p className={s.btn_txt}>Settings</p>
                    </button>
              
              {open && <ModalProfile handleClose={() => setOpen(false)} />}
            </div>

        </div>
    );
};
export default SideBar;
