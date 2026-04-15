import { Routes, Route, Navigate } from "react-router-dom";

// Security Wrappers
import ProtectedRoute from "./Components/common/Routing/ProtectedRoute";
import PublicRoute from "./Components/common/Routing/PublicRoute";

//Guest Side Routes
import Login from "./Pages/guest/Login";
import ForgotPassword from "./Components/Authentication/Forgotpassword";
import ChangePassword from "./Components/Authentication/Changepassword";
import ResetPassword from "./Components/Authentication/Resetpassword";
import Home from "./Pages/guest/Home";
import SubmitJd from "./Pages/guest/SubmitJd";
import Register from "./Pages/guest/Register";
import Unauthorized from "./Pages/guest/Unauthorized";

// Layouts
import StudentLayout from "./Components/Student/StudentLayout";
import AdminLayout from "./Components/Admin/AdminLayout";

//Student Side Routes
import StudDashboard from "./Pages/Student/Dashboard";
import StudProfile from "./Pages/Student/Profile";
import StudJobs from "./Pages/Student/Jobs";
import StudApplications from "./Pages/Student/Applications";
import StudInterviewSchedule from "./Pages/Student/Interview_schedule";
import StudPlacementHistory from "./Pages/Student/Placement_history";
import StudChangePass from "./Pages/Student/Change_pass";
import StudLogout from "./Pages/Student/Logout";
import StudJobDetails from "./Pages/Student/JobDetails";
import StudForgotPassword from "./Pages/Student/forgot_pass";

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
import AdminManageApplications from "./Pages/Admin/ManageApplications";

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect Aliases */}
      <Route path="/login" element={<Navigate to="/Authentication/login" replace />} />
      <Route path="/AdminLogin" element={<Navigate to="/Authentication/login" replace />} />
      <Route path="/submit-jd" element={<Navigate to="/SubmitJd" replace />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Guest/Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/SubmitJd" element={<SubmitJd />} />
        <Route path="/Authentication/login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Authentication/change-password" element={<ChangePassword />} />
        <Route path="/Authentication/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
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
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
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
          <Route path="/AdminManageApplications" element={<AdminManageApplications />} />
        </Route>
      </Route>

      {/* Catch-all Logout */}
      <Route path="/StudLogout" element={<StudLogout />} />

      {/* Global Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;