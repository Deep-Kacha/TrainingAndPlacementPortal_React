import { Routes, Route } from "react-router-dom";
import Login from "./pages/guest/Login";
import ForgotPassword from "./components/Authentication/Forgotpassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;