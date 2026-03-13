import { Routes, Route } from "react-router-dom";
import Login from "./pages/guest/Login";
import ForgotPassword from "./components/Authentication/Forgotpassword";
import ChangePassword from "./components/Authentication/Changepassword";
import ResetPassword from "./components/Authentication/Resetpassword";
import Home from "./pages/guest/Home";
import SubmitJd from "./pages/guest/SubmitJd";
import Register from "./pages/guest/Register";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/submitjd" element={<SubmitJd />} />
      <Route path="/Authentication/login" element={<Login />} />
      <Route path="/Authentication/forgot-password" element={<ForgotPassword />} />
      <Route path="/Authentication/change-password" element={<ChangePassword />} />
      <Route path="/Authentication/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default AppRoutes;