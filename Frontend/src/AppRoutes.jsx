import { Routes, Route, Navigate } from "react-router-dom";

//Guest Side Routes
import Login from "./Pages/guest/Login";
import ForgotPassword from "./Components/Authentication/Forgotpassword";
import ChangePassword from "./Components/Authentication/Changepassword";
import ResetPassword from "./Components/Authentication/Resetpassword";
import Home from "./Pages/guest/Home";
import SubmitJd from "./Pages/guest/SubmitJd";
import Register from "./Pages/guest/Register";
import AuthHeader from "./Components/common/AuthHeader";

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

//Company Side Routes
import CompanyLayout from "./Components/Company/CompanyLayout";
import CompanyDashboard from "./Pages/Company/Dashboard";
import CompanyJobs from "./Pages/Company/Jobs";
import CompanyApplicants from "./Pages/Company/Applicants";

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect Aliases for ease of use */}
      <Route path="/login" element={<Navigate to="/Authentication/login" replace />} />
      <Route path="/AdminLogin" element={<Navigate to="/Authentication/login" replace />} />
      <Route path="/submit-jd" element={<Navigate to="/SubmitJd" replace />} />

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
        <Route path="/AdminManageApplications" element={<AdminManageApplications />} />
      </Route>

      {/* Company Side Routes (with Layout) */}
      <Route element={<CompanyLayout />}>
        <Route path="/CompanyDashboard" element={<CompanyDashboard />} />
        <Route path="/CompanyJobs" element={<CompanyJobs />} />
        <Route path="/CompanyApplicants" element={<CompanyApplicants />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;