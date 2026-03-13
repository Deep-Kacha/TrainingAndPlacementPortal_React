// pages/CompanyRegister.jsx  (or wherever you place your page components)
// Refactored: state + validation live here; UI is fully delegated to section components.
// Visual output is identical to the original.

import React, { useState } from "react";
import ContactInfoSection from "./company/Contactinfosection";
import CompanyDetailsSection from "./company/Companydetailssection";
import JobRoleSection from "./company/Jobrolesection";
import EligibilitySection from "./company/Eligibilitysection";
import SelectionProcessSection from "./company/Selectionprocesssection";
import ContactPersonSection from "./company/Contactpersonsection";
import UploadDocumentsSection from "./company/Uploaddocumentssection";
import AdditionalDetailsSection from "./company/Additionaldetailssection";

const INITIAL_STATE = {
  email: "", companyName: "", jobLocation: "", website: "", description: "",
  jobPosition: "", ctc: "", internshipDuration: "", stipend: "", bond: "", joinDate: "",
  eligibleBatches: [], eligibleCourses: [],
  selectionProcess: "", driveDate: "", registrationLink: "",
  contactName: "", contactEmail: "", contactMobile: "", additionalInfo: "",
};

const CompanyRegister = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors]     = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (fieldName, value) => {
    const currentList = formData[fieldName];
    setFormData((prev) => ({
      ...prev,
      [fieldName]: currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value],
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email)            newErrors.email            = "Email is required";
    if (!formData.companyName)      newErrors.companyName      = "Company name is required";
    if (!formData.jobLocation)      newErrors.jobLocation      = "Job location is required";
    if (!formData.website)          newErrors.website          = "Website is required";
    if (!formData.jobPosition)      newErrors.jobPosition      = "Job position is required";
    if (!formData.ctc)              newErrors.ctc              = "Annual CTC is required";
    if (!formData.joinDate)         newErrors.joinDate         = "Date of joining is required";
    if (!formData.selectionProcess) newErrors.selectionProcess = "Selection process is required";
    if (!formData.driveDate)        newErrors.driveDate        = "Campus drive date is required";
    if (!formData.contactName)      newErrors.contactName      = "Contact name is required";
    if (!formData.contactEmail)     newErrors.contactEmail     = "Contact email is required";
    if (!formData.contactMobile)    newErrors.contactMobile    = "Contact mobile is required";
    if (formData.contactMobile && !/^[0-9]{10}$/.test(formData.contactMobile)) {
      newErrors.contactMobile = "Mobile must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      // TODO: Send formData to your backend API here
    }
  };

  const handleCancel = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">

      {/* Page Title */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 py-5 text-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Campus Placement Registration Form</h1>
        <p className="text-xs text-gray-400 mt-1">RK University, Rajkot – Training & Placement Cell</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5">
        <ContactInfoSection />

        <CompanyDetailsSection
          formData={formData} errors={errors} handleChange={handleChange}
        />

        <JobRoleSection
          formData={formData} errors={errors} handleChange={handleChange}
        />

        <EligibilitySection
          formData={formData} handleCheckbox={handleCheckbox}
        />

        <SelectionProcessSection
          formData={formData} errors={errors} handleChange={handleChange}
        />

        <ContactPersonSection
          formData={formData} errors={errors} handleChange={handleChange}
        />

        <UploadDocumentsSection />

        <AdditionalDetailsSection
          formData={formData} handleChange={handleChange}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pb-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-7 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-7 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegister;