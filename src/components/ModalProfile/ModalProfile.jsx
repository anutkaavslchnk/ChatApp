import { useEffect, useState } from "react";
import s from './ModalProfile.module.css';
import user from '/public/user.png';
import {  useDispatch, useSelector } from "react-redux";
import { userEmail, userName, userProfileAvatar } from "../../redux/auth/selectors.js";
import { updateProfileThunk } from "../../redux/auth/operations";
const ModalProfile = ({ handleClose }) => {
    
    const name=useSelector(userName);
    const email=useSelector(userEmail);
    const profileAvatar = useSelector(userProfileAvatar);

const [file, setFile]=useState(null);
const dispatch =useDispatch();

//uploading avatar logic 
const handleImageUpdates=e=>{
const file=e.target.files[0];
if(!file) return;
const reader=new FileReader();
reader.readAsDataURL(file);

reader.onloadend=async()=>{
    const base64=reader.result;
    setFile(base64);
    dispatch(updateProfileThunk({ profileAvatar: base64 }));
    
}
}

useEffect(() => {
    if (profileAvatar) {
        setFile(profileAvatar);
        
    }
}, [profileAvatar]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClose]); 




    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

  return (
  <div className={s.wrapper} onClick={handleBackdropClick}>
  <div className={s.content}>




<div className={s.cont_update}>
<div className={s.field_photo}>
        <img  className={s.user} src={file ? file : user}></img>
    <input className={s.hidden} type="file" onChange={handleImageUpdates}></input></div>
<h1>{name}</h1>

<label>
    Email
<input type="text" placeholder={`${email}`} disabled/>
</label>

<label>
    Password
    
<input type="text" placeholder="{password}" disabled />
</label>

</div>
    
    <button  onClick={handleClose} className={s.close} >×</button>
  </div>
  
  </div>
)
};

export default ModalProfile;
