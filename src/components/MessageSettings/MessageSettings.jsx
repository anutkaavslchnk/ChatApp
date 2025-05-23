import React from "react";
import s from './MessageSettings.module.css';
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../redux/messages/operations";
const MessageSettings = ({onClose,onDelete}) => {


  return <div className={s.container}>
    <button onClick={onClose}>Close</button>
    <button onClick={onDelete}>Delete</button>
    <button>Edit</button>
  </div>;
};

export default MessageSettings;
