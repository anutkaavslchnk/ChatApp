import { useDispatch, useSelector } from "react-redux";
import s from "./SideBar.module.css";
import avatar from "/public/user.png";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/users/operations.js";
import { getSelectedUser, getUsersSelector } from "../../redux/users/selectors.js";
import { selectedUser } from "../../redux/users/slice.js";
import { getOnlineUsers, isTyping } from "../../redux/socket/selectors.js";
import { getMessages } from "../../redux/messages/operations.js";

const SideBar = () => {
    const dispatch = useDispatch();

    const users = useSelector(getUsersSelector);
    const onlineUsers = useSelector(getOnlineUsers);
    const typingUsers = useSelector(isTyping);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    if (!Array.isArray(users) || users.length === 0) {
        return <p>Loading users...</p>;
    }

    return (
        <div className={s.cont}>
            <ul className={s.list}>
                {users.map((user) => {
                    const isOnline = onlineUsers.includes(user._id);
                    const isUserTyping = typingUsers.includes(user._id);

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
                            <p>{user.fullName}</p>

                            {isUserTyping && (
                                <div className={s.typing}>
                                    <span>Typing...</span>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SideBar;
