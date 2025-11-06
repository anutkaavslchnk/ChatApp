import { useDispatch, useSelector } from "react-redux";
import s from "./SideBar.module.css";
import avatar from "/public/user.png";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../redux/users/operations.js";
import { getUsersSelector } from "../../redux/users/selectors.js";
import { selectedUser } from "../../redux/users/slice.js";
import { getOnlineUsers, isTyping } from "../../redux/socket/selectors.js";
import { getMessages } from "../../redux/messages/operations.js";
import { getCurrentUser } from "../../redux/auth/selectors.js";

import { logOutThunk } from "../../redux/auth/operations.js";

import icons from "/public/vite.svg";

import { getConversationSummariesList } from "../../redux/conversation/operations.js";
import { getSummaries } from "../../redux/conversation/selectors.js";

import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const nav = useNavigate();
  const handleOpenModal = () => {
    nav("/home/personal");
  };
  const openSettings = () => {
    nav("/home/settings");
  };
  const dispatch = useDispatch();

  const users = useSelector(getUsersSelector);
  const onlineUsers = useSelector(getOnlineUsers);
  const typingUsers = useSelector(isTyping);
  const currentUser = useSelector(getCurrentUser);

  const getSummary = useSelector(getSummaries);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getConversationSummariesList(currentUser._id));
    }
  }, [dispatch, currentUser]);
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
        {[...users]
          .sort((a, b) => {
            const timeA = getSummary[a._id]?.lastMessage?.time
              ? new Date(getSummary[a._id].lastMessage.time).getTime()
              : 0;
            const timeB = getSummary[b._id]?.lastMessage?.time
              ? new Date(getSummary[b._id].lastMessage.time).getTime()
              : 0;
            return timeB - timeA; // descending order
          })
          .map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const isUserTyping = typingUsers.includes(user._id);
            const summary = getSummary[user._id];
            const lastText = summary?.lastMessage?.txt || "No messages";
            const unread = summary?.unreadCount || 0;
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
                    <div className={s.cont_date_msg}>
                      <p className={s.lastMsg}>
                        {isUserTyping ? "Typing..." : lastText}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <div className={s.settings_container}>
        <button className={s.btn_profile} onClick={handleOpenModal}>
          <div className={s.circle_profile}></div>
          <p className={s.btn_txt}>Profile</p>
        </button>
        <button
          className={s.btn_profile}
          onClick={() => dispatch(logOutThunk())}
        >
          <svg width="30" height="30">
            <use href={`${icons}#logout`}></use>
          </svg>
          <p className={s.btn_txt}>Log out</p>
        </button>
        <button className={s.btn_profile} onClick={openSettings}>
          <svg width="30px" height="30px">
            <use href={`${icons}#settings`}></use>
          </svg>
          <p className={s.btn_txt}>Settings</p>
        </button>
      </div>
    </div>
  );
};
export default SideBar;
