import { io } from "socket.io-client";
import {
  addTypingUser,
  removeTypingUser,
  setOnlineUsers,
  setSocket,
} from "./slice";
import {
  addMessage,
  deleteLocal,
  setDeliveredLocal,
  setReadLocal,
  updateLocalMessage,
} from "../messages/slice";
import { updateSummary } from "../conversation/slice";

export const connectedSocket = (dispatch, token, userId) => {
  //  if (!user ){
  //     console.error('User ID is not available');
  //     return
  //  }
  const socket = io("https://chatapp-bd.onrender.com", {
    transports: ["websocket"],
    auth: {
      token,
    },
    query: {
      userId,
    },
  });

  socket.on("connect", () => {
    console.log("Connected to socket server", socket.id);
  });

  //online users logic
  socket.on("getOnlineUsers", (userIds) => {
    dispatch(setOnlineUsers(userIds));
  });

  //message logic
  socket.on("newMessage", (msg) => {
    const msgWithTime = {
      ...msg,
      time: msg.time || new Date().toISOString(),
    };

    dispatch(addMessage(msgWithTime));
    dispatch(updateSummary({ ...msgWithTime, currentUserId: userId }));

    // const notificationSound = new Audio(
    //   "/public/message-notification-190034 (1).mp3"
    // );
    // if (msg.senderId !== userId) {
    //   notificationSound
    //     .play()
    //     .catch((err) => console.error("Audio playback error:", err));
    // }

    // if (
    //   typeof Notification !== "undefined" &&
    //   msg.senderId !== userId &&
    //   Notification.permission === "granted"
    // ) {
    //   new Notification("New message", {
    //     body: `${msg.senderName || "User"}: ${msg.txt}`,
    //     icon: msg.senderAvatar || "/user.png",
    //   });
    // }
  });

  // delivered/read logic

  //typing logic

  socket.on("typing", ({ from }) => {
    dispatch(addTypingUser(from));
  });

  socket.on("stopTyping", ({ from }) => {
    dispatch(removeTypingUser(from));
  });
  socket.on("messageDeleted", ({ messageId }) => {
    dispatch(deleteLocal(messageId));
  });
  socket.on("messageUpdated", ({ messageId, newText }) => {
    dispatch(updateLocalMessage({ messageId, newText }));
  });
  socket.on("messageDelivered", ({ messageId }) => {
    dispatch(setDeliveredLocal(messageId));
  });
  socket.on("messageRead", ({ messageId }) => {
    dispatch(setReadLocal(messageId));
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from socket");
  });
  socket.connect();
  dispatch(setSocket(socket));
};
