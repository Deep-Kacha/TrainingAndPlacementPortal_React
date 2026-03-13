import { Routes, Route, Navigate } from "react-router-dom";

//Guest Side Routes
import Login from "./pages/guest/Login";
import ForgotPassword from "./components/Authentication/Forgotpassword";
import ChangePassword from "./components/Authentication/Changepassword";
import ResetPassword from "./components/Authentication/Resetpassword";
import Home from "./pages/guest/Home";
import SubmitJd from "./pages/guest/SubmitJd";
import Register from "./pages/guest/Register";

//Student Side Routes
import StudDashboard from "./pages/Student/Dashboard";
import StudProfile from "./pages/Student/Profile";
import StudJobs from "./pages/Student/Jobs";
import StudApplications from "./pages/Student/Applications";
import StudInterviewSchedule from "./pages/Student/Interview_schedule";
import StudPlacementHistory from "./pages/Student/Placement_history";
import StudChangePass from "./pages/Student/Change_pass";
import StudLogout from "./pages/Student/Logout";
import StudJobDetails from "./pages/Student/JobDetails";
import StudForgotPassword from "./pages/Student/forgot_pass";

//Admin Side Routes
import AdminDashboard from "./Pages/Admin/Dashboard";
import AdminProfile from "./Pages/Admin/Profile";
import AdminCompanyManagement from "./Pages/Admin/CompanyManagement";
import AdminJdDetail from "./Pages/Admin/JdDetail";
import AdminChangePassword from "./Pages/Admin/ChangePassword";
import AdminForgotPassword from "./Pages/Admin/ForgotPassword";
import AdminInterviewSchedule from "./Pages/Admin/InterviewSchedule";
import AdminInterviewScheduleForm from "./Pages/Admin/InterviewScheduleForm";
import AdminStudentsManagement from "./Pages/Admin/StudentsManagement";
import AdminPlacementHistory from "./Pages/Admin/PlacementHistory";



function AppRoutes() {
  return (
    <Routes>
      {/* Guest Side Routes */}
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/submitjd" element={<SubmitJd />} />
      <Route path="/Authentication/login" element={<Login />} />
      <Route path="/Authentication/forgot-password" element={<ForgotPassword />} />
      <Route path="/Authentication/change-password" element={<ChangePassword />} />
      <Route path="/Authentication/reset-password" element={<ResetPassword />} />

      {/* Student Side Routes */}
      <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
      {/* <Route path="/student" element={<StudentLayout />}> */}
      <Route path="dashboard" element={<StudDashboard />} />
      <Route path="profile" element={<StudProfile />} />
      <Route path="jobs" element={<StudJobs />} />
      <Route path="jobs/details" element={<StudJobDetails />} />
      <Route path="applications" element={<StudApplications />} />
      <Route path="interview_schedule" element={<StudInterviewSchedule />} />
      <Route path="Placement_history" element={<StudPlacementHistory />} />
      <Route path="change_pass" element={<StudChangePass />} />
      <Route path="logout" element={<StudLogout />} />
      <Route path="ForgotPassword" element={<StudForgotPassword />} />

      {/* Admin Side Routes */}
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/CompanyManagement" element={<AdminCompanyManagement />} />
      <Route path="/JdDetail" element={<AdminJdDetail />} />
      <Route path="/ChangePassword" element={<AdminChangePassword />} />
      <Route path="/ForgotPassword" element={<AdminForgotPassword />} />
      <Route path="/InterviewSchedule" element={<AdminInterviewSchedule />} />
      <Route path="/InterviewScheduleForm" element={<AdminInterviewScheduleForm />} />
      <Route path="/StudentsManagement" element={<AdminStudentsManagement />} />
      <Route path="/PlacementHistory" element={<AdminPlacementHistory />} />

    </Routes>
  );
}

export default AppRoutes;