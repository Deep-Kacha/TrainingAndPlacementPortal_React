import { Routes, Route } from "react-router-dom";
import Login from "./pages/guest/Login";
// import ForgotPassword from "./components/Authentication/Forgotpassword";
import Dashboard from "./Pages/Admin/Dashboard";
import Profile from "./Pages/Admin/Profile";
import CompanyManagement from "./Pages/Admin/CompanyManagement";
import JdDetail from "./Pages/Admin/JdDetail";
import ChangePassword from "./Pages/Admin/ChangePassword";
import ForgotPassword from "./Pages/Admin/ForgotPassword";
import InterviewSchedule from "./Pages/Admin/InterviewSchedule";
import InterviewScheduleForm from "./Pages/Admin/InterviewScheduleForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/CompanyManagement" element={<CompanyManagement />} />
      <Route path="/JdDetail" element={<JdDetail />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/InterviewSchedule" element={<InterviewSchedule />} />
      <Route path="/InterviewScheduleForm" element={<InterviewScheduleForm />} /> 
      {/* <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> */}
    </Routes>
  );
}

export default App;