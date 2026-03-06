import { Routes, Route } from "react-router-dom";
import Login from "./pages/guest/Login";
import ForgotPassword from "./components/Authentication/Forgotpassword";
import Dashboard from "./Pages/Admin/Dashboard";
import Profile from "./Pages/Admin/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> */}
    </Routes>
  );
}

export default App;