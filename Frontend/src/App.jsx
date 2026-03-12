import { Routes, Route } from "react-router-dom";
import Login from "./pages/guest/Login";
<<<<<<< HEAD
import ForgotPassword from "./components/Authentication/Forgotpassword";
import ChangePassword from "./components/Authentication/Changepassword";
import ResetPassword from "./components/Authentication/Resetpassword";
import Home from "./pages/guest/Home";
=======
// import ForgotPassword from "./components/Authentication/Forgotpassword";
import Dashboard from "./Pages/Admin/Dashboard";
import Profile from "./Pages/Admin/Profile";
import CompanyManagement from "./Pages/Admin/CompanyManagement";
import JdDetail from "./Pages/Admin/JdDetail";
import ChangePassword from "./Pages/Admin/ChangePassword";
import ForgotPassword from "./Pages/Admin/ForgotPassword";
import InterviewSchedule from "./Pages/Admin/InterviewSchedule";
import InterviewScheduleForm from "./Pages/Admin/InterviewScheduleForm";
import StudentsManagement from "./Pages/Admin/StudentsManagement";
import PlacementHistory from "./Pages/Admin/PlacementHistory";
>>>>>>> 3683e62cc3fb6991d4e7fe1efe0fd9f891810008

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Home />} />
      <Route path="/Authentication/login" element={<Login />} />
      <Route path="Authentication/forgot-password" element={<ForgotPassword />} />
      <Route path="Authentication/change-password" element={<ChangePassword />} />
      <Route path="Authentication/reset-password" element={<ResetPassword />} />
=======
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/CompanyManagement" element={<CompanyManagement />} />
      <Route path="/JdDetail" element={<JdDetail />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/InterviewSchedule" element={<InterviewSchedule />} />
      <Route path="/InterviewScheduleForm" element={<InterviewScheduleForm />} /> 
      <Route path="/StudentsManagement" element={<StudentsManagement />} />
      <Route path="/PlacementHistory" element={<PlacementHistory />} />
      {/* <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> */}
>>>>>>> 3683e62cc3fb6991d4e7fe1efe0fd9f891810008
    </Routes>
  );
}

export default App;