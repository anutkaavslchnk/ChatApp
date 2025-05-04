import { useDispatch, useSelector } from "react-redux";
import s from "./SideBar.module.css";
import avatar from "/public/user.png";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/users/operations.js";
import {  getUsersSelector } from "../../redux/users/selectors.js";
import { selectedUser } from "../../redux/users/slice.js";
import { getOnlineUsers, isTyping } from "../../redux/socket/selectors.js";
import { getMessages } from "../../redux/messages/operations.js";
import { getCurrentUser } from "../../redux/auth/selectors.js";
import { getConversationSummaries } from "../../redux/messages/selectors.js";

const SideBar = () => {
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
        </div>
    );
};
export default SideBar;
