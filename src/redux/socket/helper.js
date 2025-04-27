import { io } from "socket.io-client";
import { addTypingUser, removeTypingUser, setOnlineUsers, setSocket } from "./slice";
import { addMessage, setDeliveredLocal, setReadLocal } from "../messages/slice";
import { updateDeliveredStatus, updateReadStatus } from "../messages/operations";



export const connectedSocket=(dispatch, token,userId)=>{
//  if (!user ){
//     console.error('User ID is not available');
//     return
//  }
    const socket=io('http://localhost:5001', {
        transports: ['websocket'],
        auth:{
            token,
        },
        query:{
            userId,
        }
    });

    socket.on('connect', ()=>{
        console.log('Connected to socket server', socket.id);
        
    });

    //online users logic
    socket.on('getOnlineUsers', (userIds)=>{

        dispatch(setOnlineUsers(userIds));
    });

    //message logic
socket.on('newMessage', (msg)=>{
    dispatch(addMessage(msg))
})

// delivered/read logic


//typing logic

socket.on('typing', ({from})=>{
dispatch(addTypingUser(from))
})

socket.on('stopTyping', ({from})=>{
    dispatch(removeTypingUser(from))
})

socket.on('messageDelivered', ({messageId})=>{
    dispatch(setDeliveredLocal(messageId))
});
socket.on('messageRead',({messageId})=>{
dispatch(setReadLocal(messageId))
})
    socket.on('disconnect', ()=>{
        console.log('Disconnected from socket');
        
    });
    socket.connect();
    dispatch(setSocket(socket))
}
