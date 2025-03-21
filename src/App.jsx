import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import User from "./pages/User/User.jsx";
import { Toaster } from "react-hot-toast";


const App = () => {
  return <div>

    <Routes>
<Route path="/" element={<Home/>} ></Route>
<Route path="/login" element={<Login/>} ></Route>
<Route path="/register" element={<Register/>} ></Route>
<Route path="/home" element={<User/>} ></Route>
<Route path="*" element={<NotFound/>} ></Route>


    </Routes>
    <Toaster></Toaster>
    </div>;
};

export default App;
