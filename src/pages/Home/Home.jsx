import { useNavigate } from 'react-router-dom';
import s from './Home.module.css';

import icons from '/public/vite.svg'
import { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { isLoggedIn } from '../../redux/auth/selectors';
const Home = () => {
  
  const [nav, setNav]=useState(false);
  const navigate=useNavigate();
  const handleClick=()=>{
    setNav('true');
    navigate('/login');
  }

  const selectIsLoggedIn=useSelector(isLoggedIn);


  useEffect(() => {
    if (selectIsLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [selectIsLoggedIn, navigate]);
  
  return (
  <div className={s.cont}>


    <header className={s.header}>
    <a href="/"><p className={s.logo}>SENDYKUS</p></a>
  </header>
  <main>
  <div className={s.cont_page}>

<section className={s.section_home}>

<div className={s.icons_f}>
  
  <div>
  <svg width="108" height="98">
<use href={`${icons}#icon-tg`}></use>
</svg>
  </div>
<div><svg width="118" height="108">
<use href={`${icons}#icon-msg`}></use>
</svg></div>


</div>

<div className={s.cont_icons_txt}>
<div className={s.cont_txt}>
<p className={s.hero_title}>Connect instantly. Chat freely. Stay close
</p>
<p className={s.hero_txt}>no matter the distance!</p>
<button className={s.btn_get_started} onClick={handleClick}>Get started</button>
</div>
<div className={s.cont_icons_adaptive}>

</div>
</div>

<div className={s.icons_s}>

  
<svg width="120" height="97">
<use href={`${icons}#icon-phone`} ></use>
</svg>

<svg width="123" height="97">
<use href={`${icons}#icon-clouds`} ></use>
</svg>
</div>
</section>


</div>


  </main>
  
  </div>

)
};

export default Home;
