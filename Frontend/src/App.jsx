import { Routes, Route } from "react-router-dom";
import Login from "./pages/guest/Login";
import ForgotPassword from "./components/Authentication/Forgotpassword";
import ChangePassword from "./components/Authentication/Changepassword";
import ResetPassword from "./components/Authentication/Resetpassword";
import Home from "./pages/guest/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Authentication/login" element={<Login />} />
      <Route path="Authentication/forgot-password" element={<ForgotPassword />} />
      <Route path="Authentication/change-password" element={<ChangePassword />} />
      <Route path="Authentication/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;