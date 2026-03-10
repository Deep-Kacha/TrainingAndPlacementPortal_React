import { FaEdit } from "react-icons/fa";

const PasswordActions = () => {
  return (
    <div className="flex flex-col gap-4">

      <button className="bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700">
        <FaEdit />
        Click Here For Change Password
      </button>

      <button className="bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700">
        <FaEdit />
        Click Here For Forgot Password
      </button>

    </div>
  );
};

export default PasswordActions;