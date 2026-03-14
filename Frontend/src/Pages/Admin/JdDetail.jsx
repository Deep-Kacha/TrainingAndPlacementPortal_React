import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SectionCard from "../../Components/Admin/CompanyMangement/SectionCard";
import InputField from "../../Components/Admin/CompanyMangement/InputField";
import CheckboxGroup from "../../Components/Admin/CompanyMangement/CheckboxGroup";
import {
  FaAddressBook,
  FaBuilding,
  FaBriefcase,
  FaCheckCircle,
  FaClipboardList,
  FaUserTie,
  FaUpload
} from "react-icons/fa";

const AdminJdDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // Demo Content State
  const [formData, setFormData] = useState({
    email: "hr@multiicon.in",
    companyName: "Multiicon",
    jobLocation: "Rajkot, Gujarat",
    website: "https://www.multiicon.in",
    description: "Multiicon is a leading software development company in Rajkot, specializing in Web and Mobile App Development.",
    position: "PHP Developer",
    ctc: "₹3.6 LPA",
    internshipDuration: "6 Months",
    stipend: "₹8,000 - ₹10,000 / month",
    bond: "1.5 Years",
    joiningDate: "2025-06-01",
    eligibleBatches: ["2025"],
    eligibleCourses: ["B.Tech CS", "B.Tech IT", "MCA", "M.Sc IT"],
    selectionProcess: "1. Aptitude Test\n2. Technical Interview\n3. HR Round",
    driveDate: "2025-04-10",
    regLink: "https://forms.gle/multiicon123",
    contactName: "Shweta Jethwa",
    contactEmail: "careers@multiicon.in",
    contactMobile: "+91 90999 88877",
    additionalDetails: "Bring updated resume and passport size photographs.",
    fileName: ""
  });

  useEffect(() => {
    if (location.state?.mode === "edit") {
      setIsEditing(true);
    }
  }, [location.state]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("fileName", file.name);
    }
  };

  return (
    <div className="w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0 relative z-10">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
              Company Management
            </h1>
            <p className="text-gray-600 text-sm">
              Update and Verify company details for campus drives.  
            </p>
          </div>


          <div className="flex gap-3 w-full md:w-auto">
            <button 
              type="button"
              onClick={() => setIsEditing(true)}
              className={`bg-red-600 text-white px-5 py-2 rounded-lg flex-1 md:flex-none md:w-auto ${isEditing ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"}`}
              disabled={isEditing}
            >
              Edit Content  
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border px-5 py-2 rounded-lg flex-1 md:flex-none md:w-auto"
            >
              ← Back
            </button>
          </div>
        </div>


        {/* Form Title */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 text-center mb-6">

          <h2 className="text-lg font-semibold">
            Campus Placement Registration Form
          </h2>

          <p className="text-gray-500 text-sm">
            RK University, Rajkot – Training & Placement Cell
          </p>

        </div>


        {/* Contact Information */}
        <SectionCard
          icon={<FaAddressBook />}
          title="Contact Information"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">Dr. Vishal Doshi</p>
              <p className="text-sm text-gray-600">
                Head of Training & Placement Cell
              </p>
              <p className="text-sm">+91 98765 43210</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">Mr. Osho Shah</p>
              <p className="text-sm text-gray-600">
                Assistant Training & Placement Officer
              </p>
              <p className="text-sm">+91 87654 32109</p>
            </div>

          </div>

        </SectionCard>


        {/* Company Details */}
        <SectionCard
          icon={<FaBuilding />}
          title="Company Details"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Email Address *" 
              value={formData.email} 
              onChange={(e) => handleChange("email", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Company Name *" 
              value={formData.companyName} 
              onChange={(e) => handleChange("companyName", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Job Location *" 
              value={formData.jobLocation} 
              onChange={(e) => handleChange("jobLocation", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Company Website URL *" 
              value={formData.website} 
              onChange={(e) => handleChange("website", e.target.value)} 
              readOnly={!isEditing} 
            />

            <div className="md:col-span-2">
              <textarea
                rows="4"
                placeholder="Short Company Description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                readOnly={!isEditing}
                className={`w-full border rounded-lg p-3 outline-none ${!isEditing ? "bg-gray-100 text-gray-500" : "focus:ring-2 focus:ring-red-400"}`}
              />
            </div>
          </div>

        </SectionCard>


        {/* Job Role */}  
        <SectionCard
          icon={<FaBriefcase />}
          title="Job Role & Compensation"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Job Position" 
              value={formData.position} 
              onChange={(e) => handleChange("position", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Annual CTC" 
              value={formData.ctc} 
              onChange={(e) => handleChange("ctc", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Internship Duration" 
              value={formData.internshipDuration} 
              onChange={(e) => handleChange("internshipDuration", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Stipend During Internship" 
              value={formData.stipend} 
              onChange={(e) => handleChange("stipend", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Bond" 
              value={formData.bond} 
              onChange={(e) => handleChange("bond", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Date of Joining" 
              type="date" 
              value={formData.joiningDate} 
              onChange={(e) => handleChange("joiningDate", e.target.value)} 
              readOnly={!isEditing} 
            />
          </div>

        </SectionCard>


        {/* Eligibility */}
        <SectionCard
          icon={<FaCheckCircle />}
          title="Eligibility Criteria"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CheckboxGroup
              title="Eligible Batch"
              options={["2025", "2024", "2023"]}
              selectedOptions={formData.eligibleBatches}
              onChange={(val) => handleChange("eligibleBatches", val)}
              disabled={!isEditing}
            />

            <CheckboxGroup
              title="Eligible Courses"
              options={["B.Tech CS", "B.Tech IT", "Mechanical", "Civil", "Electrical", "BCA", "MCA", "MBA"]}
              selectedOptions={formData.eligibleCourses}
              onChange={(val) => handleChange("eligibleCourses", val)}
              disabled={!isEditing}
            />
          </div>

        </SectionCard>


        {/* Selection Process */}
        <SectionCard
          icon={<FaClipboardList />}
          title="Selection Process"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <textarea
                rows="3"
                className={`w-full border rounded-lg p-3 outline-none ${!isEditing ? "bg-gray-100 text-gray-500" : "focus:ring-2 focus:ring-red-400"}`}
                placeholder="Selection Process"
                value={formData.selectionProcess}
                onChange={(e) => handleChange("selectionProcess", e.target.value)}
                readOnly={!isEditing}
              />
            </div>

            <InputField 
              label="Expected Date of Campus Drive" 
              type="date" 
              value={formData.driveDate} 
              onChange={(e) => handleChange("driveDate", e.target.value)} 
              readOnly={!isEditing} 
            />

            <InputField 
              label="Registration Link (Optional)" 
              value={formData.regLink} 
              onChange={(e) => handleChange("regLink", e.target.value)} 
              readOnly={!isEditing} 
            />
          </div>

        </SectionCard>


        {/* Contact Person */}
        <SectionCard
          icon={<FaUserTie />}
          title="Contact Person Details"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Contact Person Name" 
              value={formData.contactName} 
              onChange={(e) => handleChange("contactName", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Contact Person Email ID" 
              value={formData.contactEmail} 
              onChange={(e) => handleChange("contactEmail", e.target.value)} 
              readOnly={!isEditing} 
            />
            <InputField 
              label="Contact Person Mobile No" 
              value={formData.contactMobile} 
              onChange={(e) => handleChange("contactMobile", e.target.value)} 
              readOnly={!isEditing} 
            />
          </div>

        </SectionCard>


        {/* Upload */}
        <SectionCard
          icon={<FaUpload />}
          title="Upload Documents"
        >

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">

            <p className="text-gray-500 mb-3">
              {formData.fileName || "Drop files here or click to browse"}
            </p>

            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange} 
            />

            {isEditing && (
              <button onClick={() => fileInputRef.current.click()} className="bg-blue-600 text-white px-5 py-2 rounded-lg">
                Choose Files
              </button>
            )}

          </div>

        </SectionCard>


        {/* Additional */}
        <SectionCard
          icon={<FaClipboardList />}
          title="Additional Details"
        >

          <textarea
            rows="4"
            placeholder="Any additional information or special requirements"
            value={formData.additionalDetails}
            onChange={(e) => handleChange("additionalDetails", e.target.value)}
            readOnly={!isEditing}
            className={`w-full border rounded-lg p-3 outline-none ${!isEditing ? "bg-gray-100 text-gray-500" : "focus:ring-2 focus:ring-red-400"}`}
          />

        </SectionCard>


        {/* Buttons */}
        {isEditing && (
          <div className="flex flex-col-reverse md:flex-row justify-end gap-4 mt-6">
            <button 
              onClick={() => setIsEditing(false)}
              className="border px-6 py-2 rounded-lg hover:bg-gray-50 w-full md:w-auto"
            >
              CANCEL
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 w-full md:w-auto"
            >
              Save Changes
            </button>
          </div>
        )}

    </div>
  );
};

export default AdminJdDetail;