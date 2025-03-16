import { Field, Formik, Form } from 'formik';
import s from './Login.module.css';
import svg from '/public/vite.svg';
import { NavLink } from 'react-router-dom';

const Login = () => {

  const initialValues={
    email:"",
    password:""
  }
  return <div className={s.container}>
    <div className={s.left_cont}>
      <h1 className={s.title_left}>Welcome back!!!</h1>
    </div>

    <div className={s.form_cont}>
      <div className={s.form_div}>
        <h2 className={s.title_right}>Sign in</h2>
<Formik initialValues={initialValues}>
  <Form className={s.form}>
    <Field className={s.item_form} name="email" type="email" placeholder="Email"></Field>
    <Field className={s.item_form} name="password" type="password" placeholder="Password"></Field>
    <button className={s.btn_login}type="submit">Sign in</button>
  </Form>
</Formik>
<button className={s.google_auth}><p>Sign in with Google </p><span> <svg className={s.svg}width="25" height="25">
  <use href={`${svg}#google`}></use>
</svg>
  </span> </button>
<p className={s.txt_trans}>Don’t have an account? <NavLink to="/register">Sign up</NavLink></p>
</div>
    </div>
  </div>;
};

export default Login;
