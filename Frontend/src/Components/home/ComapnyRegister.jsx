import React, { useState } from "react";
import ContactInfoSection from "./company/Contactinfosection";
import CompanyDetailsSection from "./company/Companydetailssection";
import JobRoleSection from "./company/Jobrolesection";
import EligibilitySection from "./company/Eligibilitysection";
import SelectionProcessSection from "./company/Selectionprocesssection";
import ContactPersonSection from "./company/Contactpersonsection";
import AdditionalDetailsSection from "./company/Additionaldetailssection";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { PORTAL_BRANDING } from "../../demo/demoConfig";

const INITIAL_STATE = {
  email: "", companyName: "", jobLocation: "", website: "", description: "",
  jobPosition: "", ctc: "", internshipDuration: "", stipend: "", bond: "", joinDate: "",
  eligibleBatches: [], eligibleCourses: [],
  selectionProcess: "", driveDate: "", registrationLink: "",
  contactName: "", contactEmail: "", contactMobile: "", additionalInfo: "",
  minCgpa: "0", deadline: "",
};

const CompanyRegister = () => {
  const [formData,     setFormData]     = useState(INITIAL_STATE);
  const [errors,       setErrors]       = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast,        setToast]        = useState({ visible: false, message: "", ok: true });

  const showToast = (message, ok = true) => {
    setToast({ visible: true, message, ok });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please fill in all required fields correctly.", false);
      return;
    }
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
            submitData.append(key, JSON.stringify(formData[key]));
        } else {
            submitData.append(key, formData[key]);
        }
      });
      const response = await fetch("/api/guest/submit-jd", {
        method: "POST",
        body: submitData,
      });
      const data = await response.json();
      if (response.ok) {
        showToast(data.message || "JD submitted successfully! Admin will review it shortly.", true);
        handleClear();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        showToast(data.error || "Submission failed. Please try again.", false);
      }
    } catch {
      showToast("Network error. Could not submit JD. Please try again later.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
  };

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">

        {/* Toast Notification */}
        {toast.visible && (
          <div className={`mb-6 flex items-start gap-3 px-5 py-4 rounded-xl shadow-md text-sm font-medium transition-all ${
            toast.ok
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}>
            {toast.ok
              ? <FaCheckCircle className="text-green-500 text-lg flex-shrink-0 mt-0.5" />
              : <FaTimesCircle className="text-red-500 text-lg flex-shrink-0 mt-0.5" />
            }
            <span>{toast.message}</span>
          </div>
        )}

        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Campus Placement Registration</h2>
          <p className="text-gray-500 text-sm mt-2">
            {PORTAL_BRANDING.institutionName}, {PORTAL_BRANDING.cityState.split(",")[0]} – Training &amp; Placement Cell
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ContactInfoSection />

          <CompanyDetailsSection
            formData={formData} errors={errors} handleChange={handleChange}
          />

          <JobRoleSection
            formData={formData} errors={errors} handleChange={handleChange}
          />

          <EligibilitySection
            formData={formData} handleCheckbox={handleCheckbox} handleChange={handleChange}
          />

          <SelectionProcessSection
            formData={formData} errors={errors} handleChange={handleChange}
          />

          <ContactPersonSection
            formData={formData} errors={errors} handleChange={handleChange}
          />

          <AdditionalDetailsSection
            formData={formData} handleChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex flex-col items-center gap-3 pb-6">
            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleClear}
                className="px-10 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition w-full sm:w-auto text-sm"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-10 py-3 rounded-md font-medium shadow transition w-full sm:w-auto flex items-center justify-center gap-2 text-sm"
              >
                {isSubmitting && <FaSpinner className="animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center max-w-md mx-auto px-4 sm:px-0">
              After registration, admin will verify your details and eligibility.
              After verification you will receive further instructions.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CompanyRegister;