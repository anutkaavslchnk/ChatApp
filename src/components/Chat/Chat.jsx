import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser } from "../../redux/users/selectors";
import avatar from '/public/user.png'
import s from './Chat.module.css';
import { Field, Form, Formik } from "formik";
import { getMessages, sendMsg } from "../../redux/messages/operations";
import { getMessagesSelector } from "../../redux/messages/selectors";
import { useEffect } from "react";
import { getCurrentUser } from "../../redux/auth/selectors";
import { getOnlineUsers } from "../../redux/socket/selectors";
const Chat = () => {
const initialValues = {
  txt: '',
}


const dispatch=useDispatch();


useEffect(()=>{
  dispatch(getMessages());
},[dispatch])

const handleSubmit=(values,options)=>{
  dispatch(sendMsg(values));
options.resetForm();

}
const messages=useSelector(getMessagesSelector);
  const user=useSelector(getSelectedUser);
  const currentUser=useSelector(getCurrentUser);
console.log(currentUser._id)
  const chatMessagesFilter=messages.filter((msg)=>
  (msg.senderId===currentUser._id && msg.receiverId===user._id)||
(msg.senderId===user._id && msg.receiverId===currentUser._id))

const online=useSelector(getOnlineUsers);
const isOnline =online.includes(user._id);
  return <div>
    
<img className={s.img} src={user.profileAvatar || avatar} alt="avatar" />
    <h2 className={s.title}>{user.fullName}</h2>
    {isOnline ? <p className={s.title}>Online</p> : <p className={s.title}>Offline</p>}
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

    <Field className={s.input_txt} type="text" name="txt" placeholder="Type the message"></Field>
    <button>Send</button>
  </Form>
 
</Formik>

   
  </div>;
};

export default Chat;
