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
    <div className="bg-[#d8cfc3] rounded-xl p-6 md:p-8 shadow-sm">

      <div className="flex flex-col items-center mb-6">

        <div className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
          {getInitials(data.name)}
        </div>

        {isEditing ? (
          <>
            <input
              name="name"
              value={data.name}
              onChange={onChange}
              className="mt-4 text-lg font-semibold text-center bg-white rounded border border-gray-400 p-1 w-3/4"
            />
            {errors?.name && <span className="text-red-500 text-xs">{errors.name}</span>}
            <input
              name="role"
              value={data.role}
              onChange={onChange}
              className="mt-1 text-gray-600 text-sm text-center bg-white rounded border border-gray-400 p-1 w-1/2"
            />
            {errors?.role && <span className="text-red-500 text-xs">{errors.role}</span>}
          </>
        ) : (
          <>
            <h2 className="mt-4 text-lg font-semibold text-center p-1 border border-transparent w-3/4">{data.name}</h2>
            <p className="mt-1 text-gray-600 text-sm text-center p-1 border border-transparent w-1/2">{data.role}</p>
          </>
        )}

      </div>

      <div className="space-y-4 text-sm">

        <div className="flex justify-between items-center border-b pb-2">
          <span>Employee Id.</span>
          {isEditing ? (
            <div className="w-1/2 flex flex-col items-end">
              <input name="employeeId" value={data.employeeId} onChange={onChange} className="w-full text-right bg-white border border-gray-400 rounded px-1" />
              {errors?.employeeId && <span className="text-red-500 text-xs">{errors.employeeId}</span>}
            </div>
          ) : (
            <span className="text-right px-1 border border-transparent w-1/2">{data.employeeId}</span>
          )}
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <span>Department</span>
          {isEditing ? (
            <div className="w-1/2 flex flex-col items-end">
              <input name="department" value={data.department} onChange={onChange} className="w-full text-right bg-white border border-gray-400 rounded px-1" />
              {errors?.department && <span className="text-red-500 text-xs">{errors.department}</span>}
            </div>
          ) : (
            <span className="text-right px-1 border border-transparent w-1/2">{data.department}</span>
          )}
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <span>Office Location</span>
          {isEditing ? (
            <div className="w-1/2 flex flex-col items-end">
              <input name="location" value={data.location} onChange={onChange} className="w-full text-right bg-white border border-gray-400 rounded px-1" />
              {errors?.location && <span className="text-red-500 text-xs">{errors.location}</span>}
            </div>
          ) : (
            <span className="text-right px-1 border border-transparent w-1/2">{data.location}</span>
          )}
        </div>

      </div>

      <button onClick={onEditToggle} className={`mt-6 w-full ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white py-3 rounded-lg flex items-center justify-center gap-2`}>
        {isEditing ? <FaSave /> : <FaEdit />}
        {isEditing ? "SAVE PROFILE" : "EDIT PROFILE"}
      </button>

    </div>
  );
};

export default ProfileCard;