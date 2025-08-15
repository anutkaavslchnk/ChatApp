import { useDispatch, useSelector } from "react-redux";
import s from "./Register.module.css";
import svg from "/public/vite.svg";
import { Field, Formik, Form } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import {
  googleRegisterThunk,
  registerThunk,
} from "../../redux/auth/operations";
import { ErrorMessage } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { isLoggedIn } from "../../redux/auth/selectors";
const Register = () => {
  const FeeedbackSchema = Yup.object().shape({
    fullName: Yup.string().required("This is required!"),
    email: Yup.string()
      .email("Must be a valid email!")
      .required("This is required!"),
    password: Yup.string()
      .min(6, "Too short! Here should be min 6 characters")
      .required("This is required!"),
  });
  const navigate = useNavigate();
  const selectIsLoggedIn = useSelector(isLoggedIn);
  const handleGoogleRegister = () => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "678360119361-dkgvdkh9r2homd1225q4elmb5kmkh92d.apps.googleusercontent.com",
      callback: (response) => {
        dispatch(googleRegisterThunk(response.credential));
      },
    });

    google.accounts.id.prompt();
  };
  useEffect(() => {
    if (selectIsLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [selectIsLoggedIn, navigate]);
  const dispatch = useDispatch();
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };
  const handleSubmit = (values, options) => {
    dispatch(registerThunk(values));
    options.resetForm();
  };
  return (
    <div className={s.container}>
      <div className={s.left_cont}>
        <h1 className={s.title_left}>
          Oh, a new user!<span>Welcome to our family</span>
        </h1>
      </div>

      <div className={s.form_cont}>
        <div className={s.form_div}>
          <h2 className={s.title_right}>Sign up</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeeedbackSchema}
          >
            <Form className={s.form}>
              <Field
                className={s.item_form}
                name="fullName"
                type="text"
                placeholder="Full name"
              ></Field>
              <ErrorMessage name="fullName" component="span" />
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
                Sign up
              </button>
            </Form>
          </Formik>
          <button className={s.google_auth} onClick={handleGoogleRegister}>
            Sign up with Google
            <svg className={s.svg} width="25" height="25">
              <use href={`${svg}#google`}></use>
            </svg>
          </button>

          <p className={s.txt_trans}>
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
