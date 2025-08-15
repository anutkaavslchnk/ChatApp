import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser } from "../../redux/users/selectors";
import avatar from "/public/user.png";
import s from "./Chat.module.css";
import { Field, Form, Formik } from "formik";
import {
  deleteMessage,
  getMessages,
  sendMsg,
  updateDeliveredStatus,
  updateMessage,
  updateReadStatus,
} from "../../redux/messages/operations";
import { getMessagesSelector } from "../../redux/messages/selectors";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../../redux/auth/selectors";
import {
  getOnlineUsers,
  getSocket,
  isTyping,
} from "../../redux/socket/selectors";
import svg from "/public/vite.svg";
import MessageSettings from "../MessageSettings/MessageSettings";
const Chat = () => {
  const initialValues = {
    txt: "",
  };

  const dispatch = useDispatch();
  const user = useSelector(getSelectedUser);
  const messages = useSelector(getMessagesSelector);
  const currentUser = useSelector(getCurrentUser);
  const type = useSelector(isTyping);
  const online = useSelector(getOnlineUsers);
  const isOnline = online.includes(user._id);
  const typingTimeoutRef = useRef(null);
  const socket = useSelector(getSocket);
  const typing = type.includes(user._id);
  const [openMsgSettings, setOpenMsgSettings] = useState(null);
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleOpenMessageSettings = (msg) => {
    setOpenMsgSettings(msg);
  };

  useEffect(() => {
    if (user && user._id) {
      dispatch(getMessages());
    }
  }, [user?._id, dispatch, user]);

  const handleSubmit = (values, options) => {
    dispatch(sendMsg(values));
    options.resetForm();
  };

  const handleDeleteMessage = (messageId) => {
    dispatch(deleteMessage(messageId));

    if (socket && user && currentUser) {
      socket.emit("deleteMessage", {
        messageId,
        senderId: currentUser._id,
        receiverId: user._id,
      });
    }

    setOpenMsgSettings(null);
  };

  const handleChangeMessage = (messageId, newText) => {
    dispatch(
      updateMessage({ msgId: messageId, updatedData: { txt: newText } })
    );

    console.log("Updating msg", messageId, "with text:", newText);
    if (socket && user && currentUser) {
      socket.emit("messageUpdated", {
        messageId,
        newText,
      });
    }

    setOpenMsgSettings(null);
  };

  const chatMessagesFilter = messages.filter(
    (msg) =>
      user &&
      currentUser &&
      ((msg.senderId === currentUser._id && msg.receiverId === user._id) ||
        (msg.senderId === user._id && msg.receiverId === currentUser._id))
  );

  const handleTyping = () => {
    if (socket && user) {
      socket.emit("typing", { to: user._id, from: currentUser._id });
    }
  };
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessagesFilter]);

  useEffect(() => {
    chatMessagesFilter.forEach((msg) => {
      if (msg.senderId === user._id && !msg.isDelivered) {
        dispatch(updateDeliveredStatus(msg._id));
        socket.emit("messageDelivered", {
          messageId: msg._id,
          senderId: msg.senderId,
        });
      }
    });
  }, [chatMessagesFilter, dispatch, user._id, socket]);

  useEffect(() => {
    chatMessagesFilter.forEach((msg) => {
      if (msg.senderId === user._id && msg.isDelivered && !msg.isRead) {
        dispatch(updateReadStatus(msg._id));
        socket.emit("messageRead", {
          messageId: msg._id,
          senderId: msg.senderId,
        });
      }
    });
  }, [chatMessagesFilter, dispatch, user._id, socket]);

  return (
    <div>
      <div className={s.cont_header}>
        <div className={s.avatarWrapper}>
          <img
            className={s.img}
            src={user.profileAvatar || avatar}
            alt="avatar"
          />
          {isOnline && <span className={s.onlineDot}></span>}
        </div>
        <div className={s.cont_img_txt}>
          <h2 className={s.title}>{user.fullName}</h2>

          <p className={s.title_online_typing}>
            {typing ? "Typing..." : isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className={`${s.chatContainer}`}>
        <ul className={s.msgList}>
          {chatMessagesFilter.map((msg) => {
            const isOwnMsg = msg.senderId === user._id;
            const isSelected = openMsgSettings === msg._id;
            const shouldBlur = openMsgSettings && openMsgSettings !== msg._id;

            return (
              <li
                key={msg._id}
                className={`${s.wrapper} ${shouldBlur ? s.blurred : ""} ${
                  isSelected ? s.focused : ""
                }`}
              >
                <div
                  onDoubleClick={() => handleOpenMessageSettings(msg._id)}
                  className={`${s.msgItem} ${isOwnMsg ? s.own : s.their}`}
                >
                  {msg.txt}
                  {msg.time && (
                    <div className={s.time}>{formatTime(msg.time)}</div>
                  )}
                </div>

                {isSelected && (
                  <div className={s.msgSettingsWrapper}>
                    <MessageSettings
                      onClose={() => setOpenMsgSettings(null)}
                      messageId={msg._id}
                      onDelete={() => handleDeleteMessage(msg._id)}
                      onEdit={(newText) =>
                        handleChangeMessage(msg._id, newText)
                      }
                      originalText={msg.txt}
                    />
                  </div>
                )}
              </li>
            );
          })}
          <div ref={messagesEndRef}></div>
          {(() => {
            const lastOwnMsg = [...chatMessagesFilter]
              .reverse()
              .find((msg) => msg.senderId === currentUser._id);

            if (!lastOwnMsg) {
              return null;
            }

            return (
              <div className={s.lastStatus}>
                {lastOwnMsg.isRead ? "Read" : "Delivered"}
              </div>
            );
          })()}
        </ul>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <div className={s.inputWrapper}>
            <Field name="txt">
              {({ field }) => (
                <input
                  {...field}
                  className={s.input_txt}
                  placeholder="Type the message"
                  onChange={(e) => {
                    field.onChange(e);
                    handleTyping();
                    clearTimeout(typingTimeoutRef.current);
                    typingTimeoutRef.current = setTimeout(() => {
                      socket.emit("stopTyping", {
                        to: user._id,
                        from: currentUser._id,
                      });
                    }, 1000);
                  }}
                />
              )}
            </Field>
            <button type="submit" className={s.sendBtn}>
              <svg width="30" height="30">
                <use href={`${svg}#send`}></use>
              </svg>
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Chat;
