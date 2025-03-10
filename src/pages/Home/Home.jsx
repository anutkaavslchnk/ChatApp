import s from './Home.module.css';
import icons from '/public/vite.svg'
const Home = () => {
  return (
  <div className={s.cont}>


    <header className={s.header}>
    <a href="/"><p className={s.logo}>SENDYKUS</p></a>
  </header>
  <div className={s.cont_page}>
  <main>
    <section className={s.section_home}>
    <div className={s.icons_f}>
<svg>
  <use href={`${icons}#icon-tg`} width="108" height="98"></use>
  </svg>

  <svg>
  <use href={`${icons}#icon-msg`} width="118" height="108"></use>
  </svg>
</div>
<div className={s.cont_icons_txt}>
<div className={s.cont_txt}>
    <p className={s.hero_title}>Connect instantly. Chat freely. Stay close
    </p>
    <p className={s.hero_txt}>no matter the distance!</p>
    <button className={s.btn_get_started}>Get started</button>
    </div>
<div className={s.cont_icons_adaptive}>
{/* <svg>
  <use href={`${icons}#icon-tg`} width="80" height="70"></use>
  </svg>

  <svg>
  <use href={`${icons}#icon-msg`} width="80" height="70"></use>
  </svg>


    <svg>
  <use href={`${icons}#icon-phone`} width="80" height="77"></use>
  </svg>

  <svg>
  <use href={`${icons}#icon-clouds`} width="80" height="70"></use>
  </svg> */}
</div>
</div>

    <div className={s.icons_s}>
    <svg>
  <use href={`${icons}#icon-phone`} width="112" height="87"></use>
  </svg>

  <svg>
  <use href={`${icons}#icon-clouds`} width="113" height="90"></use>
  </svg>
    </div>
    </section>

  </main>
    </div>

  </div>

)
};

export default Home;
