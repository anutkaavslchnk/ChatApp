import { Field, Formik, Form, ErrorMessage } from "formik";
import s from "./Login.module.css";
import svg from "/public/vite.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/auth/operations.js";
import { isLoggedIn } from "../../redux/auth/selectors.js";
import * as Yup from "yup";
import { useEffect } from "react";
import { googleLoginThunk } from "../../redux/auth/operations";

const Login = () => {
  const selectIsLoggedIn = useSelector(isLoggedIn);
  const FeeedbackSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email!")
      .required("This is required!"),
    password: Yup.string().required("This is required!"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values, options) => {
    dispatch(loginThunk(values));
    options.resetForm();
  };
  const handleGoogleLogin = () => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "678360119361-dkgvdkh9r2homd1225q4elmb5kmkh92d.apps.googleusercontent.com",
      callback: (response) => {
        dispatch(googleLoginThunk(response.credential));
      },
    });

    google.accounts.id.prompt();
  };
  useEffect(() => {
    if (selectIsLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [selectIsLoggedIn, navigate]);

  return (
    <div className={s.container}>
      <div className={s.left_cont}>
        <h1 className={s.title_left}>Welcome back!!!</h1>
      </div>

      <div className={s.form_cont}>
        <div className={s.form_div}>
          <h2 className={s.title_right}>Sign in</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeeedbackSchema}
          >
            <Form className={s.form}>
              <Field
                className={s.item_form}
                name="email"
                type="email"
                placeholder="Email"
              ></Field>
              <ErrorMessage name="email" component="span" />
              <Field
                className={s.item_form}
                name="password"
                type="password"
                placeholder="Password"
              ></Field>
              <ErrorMessage name="password" component="span" />
              <button className={s.btn_login} type="submit">
                Sign in
              </button>
            </Form>
          </Formik>
          <button className={s.google_auth} onClick={handleGoogleLogin}>
            Sign in with Google
            <svg className={s.svg} width="25" height="25">
              <use href={`${svg}#google`}></use>
            </svg>
          </button>

          <p className={s.txt_trans}>
            Don’t have an account? <NavLink to="/register">Sign up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
