import { useState } from "react";
import s from "./MessageSettings.module.css";

const MessageSettings = ({ onClose, onDelete, onEdit, originalText }) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(originalText);

  const handleSave = () => {
    onEdit(text);
    setEditMode(false);
  };

  return (
    <div className={s.container}>
      <button onClick={onClose}>Close</button>
      <button onClick={onDelete}>Delete</button>

      {!editMode && <button onClick={() => setEditMode(true)}>Edit</button>}

      {editMode && (
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={s.editInput}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default MessageSettings;
