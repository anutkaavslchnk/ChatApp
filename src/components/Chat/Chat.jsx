import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser } from "../../redux/users/selectors";
import avatar from '/public/user.png'
import s from './Chat.module.css';
import { Field, Form, Formik } from "formik";
import { getMessages, sendMsg } from "../../redux/messages/operations";
import { getMessagesSelector } from "../../redux/messages/selectors";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../../redux/auth/selectors";
import { getOnlineUsers, getSocket, isTyping } from "../../redux/socket/selectors";
const Chat = () => {
const initialValues = {
  txt: '',
}


const dispatch=useDispatch();
const user=useSelector(getSelectedUser);
const messages=useSelector(getMessagesSelector);
const currentUser=useSelector(getCurrentUser);
const type=useSelector(isTyping)
const online=useSelector(getOnlineUsers);
const isOnline =online.includes(user._id);
const typingTimeoutRef=useRef(null);
const socket=useSelector(getSocket);
const typing=type.includes(user._id);




useEffect(()=>{
  if (user && user._id) {
    dispatch(getMessages());
  }

},[user,dispatch])

const handleSubmit=(values,options)=>{
  dispatch(sendMsg(values));
options.resetForm();

}





  const chatMessagesFilter=messages.filter((msg)=>
  (msg.senderId===currentUser._id && msg.receiverId===user._id)||
(msg.senderId===user._id && msg.receiverId===currentUser._id))



const handleTyping = () => {
  if(socket && user){
    socket.emit('typing', {to:user._id, from:currentUser._id})
  }
}



  return <div>
    
<img className={s.img} src={user.profileAvatar || avatar} alt="avatar" />
    <h2 className={s.title}>{user.fullName}</h2>
    {isOnline ? <p className={s.title}>Online</p> : <p className={s.title}>Offline</p>}
    {typing && <p className={s.typing}>Typing...</p>}
    <div className={s.line}></div>


    <ul className={s.msgList}>

  {chatMessagesFilter.map((msg) => {
    const isOwnMsg=msg.senderId===user._id;
       return(
        <li key={msg._id} className={`${s.msgItem} ${isOwnMsg ? s.own : s.their}`}>{msg.txt}</li>
      )
  })}

    </ul>
    
<Formik initialValues={initialValues} onSubmit={handleSubmit}>

  <Form className={s.form}>

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
                  socket.emit("stopTyping", { to: user._id, from: currentUser._id });
                }, 1000);
              }}
            />
          )}
        </Field>
    <button>Send</button>
  </Form>
 
</Formik>

   
  </div>;
};

export default Chat;
