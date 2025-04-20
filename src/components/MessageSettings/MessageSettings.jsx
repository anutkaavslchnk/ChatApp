import React from "react";
import s from './MessageSettings.module.css';
const MessageSettings = ({onClose}) => {


  return <div className={s.container}>
    <button onClick={onClose}>Close</button>
    <button>Delete</button>
    <button>Edit</button>
  </div>;
};

export default MessageSettings;
