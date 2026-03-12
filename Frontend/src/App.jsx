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

import { Routes, Route, Navigate } from "react-router-dom";
import StudentLayout from "./components/StudentLayout";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Interview_schedule from "./pages/Interview_schedule";
import Placement_history from "./pages/Placement_history";
import Change_pass from "./pages/Change_pass";
import Logout from "./pages/Logout";
import JobDetails from "./pages/JobDetails";
import ForgotPassword from "./pages/forgot_pass";





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

      {/* Student Side Routes  */}
      <Route path="/" element={<Navigate to="/student/dashboard" replace />} />

      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/details" element={<JobDetails />} />
        <Route path="applications" element={<Applications />} />
        <Route path="interview_schedule" element={<Interview_schedule />} />
        <Route path="Placement_history" element={<Placement_history />} />
        <Route path="change_pass" element={<Change_pass />} />
        <Route path="logout" element={<Logout />} />
        <Route path="ForgotPassword" element={<ForgotPassword />} />
      </Route>

    </Routes>
  );
}

export default App;