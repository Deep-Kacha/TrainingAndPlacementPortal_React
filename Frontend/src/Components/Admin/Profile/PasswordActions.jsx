import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PasswordActions = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">

      <button
        onClick={() => navigate("/ChangePassword")}
        className="bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700"
      >
        <FaEdit />
        Click Here For Change Password
      </button>

      <button
        onClick={() => navigate("/ForgotPassword")}
        className="bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700"
      >
        <FaEdit />
        Click Here For Forgot Password
      </button>

    </div>
  );
};

export default PasswordActions;