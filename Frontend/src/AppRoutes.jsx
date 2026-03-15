import { Routes, Route, Navigate } from "react-router-dom";

//Guest Side Routes
import Login from "./pages/guest/Login";
import ForgotPassword from "./Components/Authentication/Forgotpassword";
import ChangePassword from "./Components/Authentication/Changepassword";
import ResetPassword from "./Components/Authentication/Resetpassword";
import Home from "./pages/guest/Home";
import SubmitJd from "./pages/guest/SubmitJd";
import Register from "./pages/guest/Register";
import AuthHeader from "./components/common/AuthHeader";

// Layouts
import StudentLayout from "./Components/Student/StudentLayout";
import AdminLayout from "./Components/Admin/AdminLayout";

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
      <Route path="/Register" element={<Register />} />
      <Route path="/SubmitJd" element={<SubmitJd />} />
      <Route path="/Authentication/login" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/Authentication/change-password" element={<ChangePassword />} />
      <Route path="/Authentication/reset-password" element={<ResetPassword />} />

      {/* Student Side Routes (with Layout) */}
      <Route element={<StudentLayout />}>
        <Route path="/StudDashboard" element={<StudDashboard />} />
        <Route path="/StudProfile" element={<StudProfile />} />
        <Route path="/StudJobs" element={<StudJobs />} />
        <Route path="/StudJobDetails" element={<StudJobDetails />} />
        <Route path="/StudApplications" element={<StudApplications />} />
        <Route path="/StudInterviewSchedule" element={<StudInterviewSchedule />} />
        <Route path="/StudPlacementHistory" element={<StudPlacementHistory />} />
        <Route path="/StudChangePass" element={<StudChangePass />} />
        <Route path="/StudForgotPassword" element={<StudForgotPassword />} />
      </Route>
      <Route path="/StudLogout" element={<StudLogout />} />

      {/* Admin Side Routes (with Layout) */}
      <Route element={<AdminLayout />}>
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path="/AdminCompanyManagement" element={<AdminCompanyManagement />} />
        <Route path="/AdminJdDetail" element={<AdminJdDetail />} />
        <Route path="/AdminForgotPassword" element={<AdminForgotPassword />} />
        <Route path="/AdminChangePassword" element={<AdminChangePassword />} />
        <Route path="/AdminInterviewSchedule" element={<AdminInterviewSchedule />} />
        <Route path="/AdminInterviewScheduleForm" element={<AdminInterviewScheduleForm />} />
        <Route path="/AdminStudentsManagement" element={<AdminStudentsManagement />} />
        <Route path="/AdminPlacementHistory" element={<AdminPlacementHistory />} />
      </Route>
      <Route path="/AdminForgotPassword" element={<AdminForgotPassword />} />

    </Routes>
  );
}

export default AppRoutes;