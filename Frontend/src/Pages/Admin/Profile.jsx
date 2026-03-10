import { useState } from "react";
import Sidebar from "../../Components/Admin/SideBar";
import ProfileCard from "../../Components/Admin/Profile/ProfileCard";
import ProfileInfoForm from "../../Components/Admin/Profile/ProfileInfoForm";
import AddPortalUser from "../../Components/Admin/Profile/AddPortalUser";
import PasswordActions from "../../Components/Admin/Profile/PasswordActions";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Vishal Doshi",
    role: "TPO Head",
    employeeId: "26FGHP579",
    department: "Training & Placement Shell",
    location: "Office No .27",
    mobile: "+91 98765 43210",
    email: "vishal.doshi@rku.ac.in"
  });
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Full Name is required";
        break;
      case "role":
        if (!value.trim()) error = "Role is required";
        break;
      case "employeeId":
        if (!value.trim()) error = "Employee Id is required";
        break;
      case "department":
        if (!value.trim()) error = "Department is required";
        break;
      case "location":
        if (!value.trim()) error = "Office Location is required";
        break;
      case "mobile":
        if (!value.trim()) error = "Mobile number is required";
        else if (!/^\+?[0-9\s-]{10,}$/.test(value)) error = "Invalid mobile number";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email address";
        break;
      default:
        break;
    }
    return error;
  };

  const handleEditToggle = () => {
    if (isEditing) {
      const newErrors = {};
      let isValid = true;
      Object.keys(profileData).forEach((key) => {
        const error = validate(key, profileData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      });
      setErrors(newErrors);
      if (!isValid) return;

      console.log("Saving profile data:", profileData); // Save logic here
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    if (isEditing) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">

      <Sidebar />

      <div className="flex-1 bg-gray-100 p-4 md:p-8 md:ml-64 overflow-y-auto">

          {/* Header */}
          <h1 className="text-2xl md:text-3xl font-bold text-red-600">Profile</h1>
          <p className="text-gray-600 mb-8">Update your information.</p>

          {/* Top Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <ProfileCard
              data={profileData}
              isEditing={isEditing}
              onEditToggle={handleEditToggle}
              onChange={handleChange}
              errors={errors}
            />

            <ProfileInfoForm
              data={profileData}
              isEditing={isEditing}
              onChange={handleChange}
              errors={errors}
            />

          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-start">

            <AddPortalUser />

            <PasswordActions />

          </div>

      </div>

    </div>
  );
};

export default Profile;