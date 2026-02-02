import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Auth from "./utils/Auth";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route element={<Auth />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<h1>404 Path Not Found </h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
