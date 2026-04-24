import { FaEdit, FaSave } from "react-icons/fa";

const ProfileCard = ({ data, isEditing, onEditToggle, onChange, errors }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div className="bg-[#d8cfc3] rounded-xl p-6 md:p-8 shadow-sm h-full flex flex-col">

      <div className="flex flex-col items-center mb-6">

        <div className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-sm">
          {getInitials(data.name)}
        </div>

        {isEditing ? (
          <div className="w-full flex flex-col items-center mt-4">
            <input
              name="name"
              value={data.name}
              onChange={onChange}
              placeholder="Full Name"
              className="text-lg font-semibold text-center bg-white rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-1.5 w-3/4 outline-none transition-all"
            />
            {errors?.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
            
            <p className="mt-2 text-red-600 font-medium text-sm text-center">
              {data.role || "N/A"}
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800">{data.name || "N/A"}</h2>
            <p className="mt-1 text-red-600 font-medium text-sm">{data.role || "N/A"}</p>
          </div>
        )}

      </div>

      <div className="space-y-4 text-sm flex-grow">

        <div className="flex justify-between items-center border-b border-gray-300 pb-3">
          <span className="font-medium text-gray-700">Employee Id.</span>
          {isEditing ? (
            <div className="w-1/2 flex flex-col items-end">
              <input name="employeeId" value={data.employeeId} onChange={onChange} className="w-full text-right bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-md px-2 py-1.5 outline-none transition-all" />
              {errors?.employeeId && <span className="text-red-500 text-xs mt-1">{errors.employeeId}</span>}
            </div>
          ) : (
            <span className="text-right px-2 font-medium text-gray-800">{data.employeeId || "-"}</span>
          )}
        </div>

        <div className="flex justify-between items-center border-b border-gray-300 pb-3">
          <span className="font-medium text-gray-700">Department</span>
          {isEditing ? (
            <div className="w-1/2 flex flex-col items-end">
              <input name="department" value={data.department} onChange={onChange} className="w-full text-right bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-md px-2 py-1.5 outline-none transition-all" />
              {errors?.department && <span className="text-red-500 text-xs mt-1">{errors.department}</span>}
            </div>
          ) : (
            <span className="text-right px-2 font-medium text-gray-800">{data.department || "-"}</span>
          )}
        </div>

        <div className="flex justify-between items-center border-b border-gray-300 pb-3">
          <span className="font-medium text-gray-700">Office Location</span>
          {isEditing ? (
            <div className="w-1/2 flex flex-col items-end">
              <input name="location" value={data.location} onChange={onChange} className="w-full text-right bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-md px-2 py-1.5 outline-none transition-all" />
              {errors?.location && <span className="text-red-500 text-xs mt-1">{errors.location}</span>}
            </div>
          ) : (
            <span className="text-right px-2 font-medium text-gray-800">{data.location || "-"}</span>
          )}
        </div>

      </div>

      <button onClick={onEditToggle} className={`mt-8 w-full ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium shadow transition-colors`}>
        {isEditing ? <FaSave className="text-lg" /> : <FaEdit className="text-lg" />}
        {isEditing ? "SAVE PROFILE" : "EDIT PROFILE"}
      </button>

    </div>
  );
};

export default ProfileCard;