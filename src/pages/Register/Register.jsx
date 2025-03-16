import s from './Register.module.css';
import svg from '/public/vite.svg';
import { Field, Formik, Form } from 'formik';
import { NavLink } from 'react-router-dom';
const Register = () => {
  const initialValues={
    fullname:"",
    email:"",
    password:""
  }
  return <div className={s.container}>
    <div className={s.left_cont}>
      <h1 className={s.title_left}>Oh, a new user!<span>Welcome to our  family</span></h1>
    </div>

    <div className={s.form_cont}>
      <div className={s.form_div}>
        <h2 className={s.title_right}>Sign up</h2>
<Formik initialValues={initialValues}>
  <Form className={s.form}>
  <Field className={s.item_form} name="name" type="text" placeholder="Full name"></Field>
    <Field className={s.item_form} name="email" type="email" placeholder="Email"></Field>
    <Field className={s.item_form} name="password" type="password" placeholder="Password"></Field>
    <button className={s.btn_login}type="submit">Sign up</button>
  </Form>
</Formik>
<button className={s.google_auth}><p>Sign up with Google</p><span> <svg className={s.svg}width="25" height="25">
  <use href={`${svg}#google`}></use>
</svg>
  </span> </button>
<p className={s.txt_trans}>Already have an account? <NavLink to="/login">Sign in</NavLink></p>
</div>
    </div>
  </div>;
};

export default Register;
