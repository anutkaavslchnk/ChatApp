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


<h2 className={s.info}>Personal info</h2>

<div className={s.cont_update}>

    <div className={s.cont_photo}>
     <p className={s.txt_details}>Photo<br/> profile</p>
<div className={s.field_photo}>
    <label  className={s.custom_file_upload}>
        <img  className={s.user} src={file ? file : user}></img>
       
      
    <input className={s.hidden} type="file" onChange={handleImageUpdates}></input>
    </label>
    </div>

 </div>
     <div className={s.cont_photo}>
  <p className={s.txt_details}>Full name</p>
<h1 className={s.txt_about}>{name}</h1>
</div>
<label className={s.cont_photo}>
 <p className={s.txt_details}>Email</p>
<input  className={s.input_info} type="text" placeholder={`${email}`} disabled/>
</label>



</div>
    
    
  </div>
  <button  onClick={handleClose} className={s.close} >×</button>
  </div>
)
};

export default ModalProfile;
