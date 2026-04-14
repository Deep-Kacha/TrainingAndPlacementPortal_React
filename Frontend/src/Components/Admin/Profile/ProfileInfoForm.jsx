const ProfileInfoForm = ({ data, isEditing, onChange, errors }) => {
  return (
    <div className="bg-[#d8cfc3] rounded-xl p-6 md:p-8 shadow-sm h-full">

      <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-4 mb-6">
        Profile Information
      </h2>

      <div className="space-y-5">

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            name="name"
            value={data.name}
            readOnly={!isEditing}
            onChange={onChange}
            className={`w-full rounded-md p-2.5 outline-none transition-all ${
              isEditing 
                ? "bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900" 
                : "bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          />
          {isEditing && errors?.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input
            name="mobile"
            value={data.mobile}
            readOnly={!isEditing}
            onChange={onChange}
            className={`w-full rounded-md p-2.5 outline-none transition-all ${
              isEditing 
                ? "bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900" 
                : "bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          />
          {isEditing && errors?.mobile && <p className="text-red-500 text-xs mt-1.5">{errors.mobile}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            name="email"
            value={data.email}
            readOnly={!isEditing}
            onChange={onChange}
            className={`w-full rounded-md p-2.5 outline-none transition-all ${
              isEditing 
                ? "bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900" 
                : "bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          />
          {isEditing && errors?.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            name="role"
            value={data.role}
            readOnly={true}
            className="w-full rounded-md p-2.5 outline-none transition-all bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
          />
        </div>

      </div>

    </div>
  );
};

export default ProfileInfoForm;