import { Routes, Route } from "react-router-dom";
import Login from "./pages/guest/Login";
import ForgotPassword from "./components/Authentication/Forgotpassword";
import Dashboard from "./Pages/Admin/Dashboard";
import Profile from "./Pages/Admin/Profile";
import CompanyManagement from "./Pages/Admin/CompanyManagement";
import JdDetail from "./Pages/Admin/JdDetail";
import ChangePassword from "./Pages/Admin/ChangePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/CompanyManagement" element={<CompanyManagement />} />
      <Route path="/admin/jd-detail" element={<JdDetail />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />
      {/* <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> */}
    </Routes>
  );
}

export default App;