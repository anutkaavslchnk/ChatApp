import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import User from "./pages/User/User.jsx";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getMe } from "./redux/auth/operations.js";
import { useDispatch, useSelector } from "react-redux";
import ModalProfile from "./pages/ModalProfile/ModalProfile.jsx";
import { token } from "./redux/auth/selectors.js";

const App = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(token);
  useEffect(() => {
    if (accessToken) {
      dispatch(getMe());
    }
  }, [dispatch, accessToken]);
  // useEffect(() => {
  //   if (Notification.permission !== "granted") {
  //       Notification.requestPermission();
  //   }
  // }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<User />}></Route>
        <Route path="/home/personal" element={<ModalProfile />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
  );
};

export default App;
