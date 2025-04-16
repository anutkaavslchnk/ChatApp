import { io } from "socket.io-client";
import { setOnlineUsers, setSocket } from "./slice";
import { addMessage } from "../messages/slice";



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

    socket.on('getOnlineUsers', (userIds)=>{

        dispatch(setOnlineUsers(userIds));
    });
socket.on('newMessage', (msg)=>{
    dispatch(addMessage(msg))
})

    socket.on('disconnect', ()=>{
        console.log('Disconnected from socket');
        
    });
    socket.connect();
    dispatch(setSocket(socket))
}
