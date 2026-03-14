const ProfileInfoForm = ({ data, isEditing, onChange, errors }) => {
  return (
    <div className="bg-[#d8cfc3] rounded-xl p-6 md:p-8 shadow-sm">

      <h2 className="text-center font-semibold mb-6">
        Profile Information
      </h2>

      <div className="space-y-4">

        <div>
          <label className="text-sm">Full Name</label>
          <input
            name="name"
            value={data.name}
            readOnly={!isEditing}
            onChange={onChange}
            className={`w-full mt-1 rounded-md p-2 border ${isEditing ? "bg-white border-gray-400" : "bg-gray-200 border-transparent"}`}
          />
          {isEditing && errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="text-sm">Mobile Number</label>
          <input
            name="mobile"
            value={data.mobile}
            readOnly={!isEditing}
            onChange={onChange}
            className={`w-full mt-1 rounded-md p-2 border ${isEditing ? "bg-white border-gray-400" : "bg-gray-200 border-transparent"}`}
          />
          {isEditing && errors?.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <label className="text-sm">Email Address</label>
          <input
            name="email"
            value={data.email}
            readOnly={!isEditing}
            onChange={onChange}
            className={`w-full mt-1 rounded-md p-2 border ${isEditing ? "bg-white border-gray-400" : "bg-gray-200 border-transparent"}`}
          />
          {isEditing && errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm">Role</label>
          <input
            name="role"
            value={data.role}
            readOnly={!isEditing}
            onChange={onChange}
            className={`w-full mt-1 rounded-md p-2 border ${isEditing ? "bg-white border-gray-400" : "bg-gray-200 border-transparent"}`}
          />
          {isEditing && errors?.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
        </div>

      </div>

    </div>
  );
};

export default ProfileInfoForm;