import { useState, useEffect } from "react";
import ProfileCard from "../../Components/Admin/Profile/ProfileCard";
import ProfileInfoForm from "../../Components/Admin/Profile/ProfileInfoForm";
import AddPortalUser from "../../Components/Admin/Profile/AddPortalUser";
import PasswordActions from "../../Components/Admin/Profile/PasswordActions";
import { FaSpinner } from "react-icons/fa";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    employeeId: "",
    department: "",
    location: "",
    mobile: "",
    email: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setProfileData({
          name: result.data.name || "",
          role: result.data.role || "Admin",
          employeeId: result.data.employeeId || "",
          department: result.data.department || "",
          location: result.data.location || "",
          mobile: result.data.mobile || "",
          email: result.data.email || ""
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  const validate = (name, value) => {
    if (!value || (typeof value === "string" && !value.trim())) {
        if (name === "mobile" || name === "location" || name === "department" || name === "employeeId") return ""; // allow empty optional fields
        return "This field is required";
    }
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address";
    return "";
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      // Validate
      const newErrors = {};
      let isValid = true;
      ["name", "email"].forEach((key) => {
        const error = validate(key, profileData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      });
      setErrors(newErrors);
      if (!isValid) return;

      // Save to backend
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/admin/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(profileData)
        });
        const result = await res.json();
        if (result.success) {
          alert("Profile updated successfully!");
        } else {
          alert("Error: " + result.error);
        }
      } catch (error) {
        alert("Failed to save profile.");
      }
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
    <div className="w-full">

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
  );
};

export default AdminProfile;