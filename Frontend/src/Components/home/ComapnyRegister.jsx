import React, { useState } from "react";
import { Phone, Mail } from "lucide-react";

const CompanyRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    jobLocation: "",
    website: "",
    description: "",
    jobPosition: "",
    ctc: "",
    internshipDuration: "",
    stipend: "",
    bond: "",
    joinDate: "",
    eligibleBatches: [],
    eligibleCourses: [],
    selectionProcess: "",
    driveDate: "",
    registrationLink: "",
    contactName: "",
    contactEmail: "",
    contactMobile: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});

  // Handle normal text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkboxes (batches and courses)
  const handleCheckbox = (fieldName, value) => {
    const currentList = formData[fieldName];
    if (currentList.includes(value)) {
      // Remove if already selected
      setFormData({ ...formData, [fieldName]: currentList.filter((item) => item !== value) });
    } else {
      // Add if not selected
      setFormData({ ...formData, [fieldName]: [...currentList, value] });
    }
  };

  // Validate form before submit
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.jobLocation) newErrors.jobLocation = "Job location is required";
    if (!formData.website) newErrors.website = "Website is required";
    if (!formData.jobPosition) newErrors.jobPosition = "Job position is required";
    if (!formData.ctc) newErrors.ctc = "Annual CTC is required";
    if (!formData.joinDate) newErrors.joinDate = "Date of joining is required";
    if (!formData.selectionProcess) newErrors.selectionProcess = "Selection process is required";
    if (!formData.driveDate) newErrors.driveDate = "Campus drive date is required";
    if (!formData.contactName) newErrors.contactName = "Contact name is required";
    if (!formData.contactEmail) newErrors.contactEmail = "Contact email is required";
    if (!formData.contactMobile) newErrors.contactMobile = "Contact mobile is required";
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
    setFormData({
      email: "", companyName: "", jobLocation: "", website: "", description: "",
      jobPosition: "", ctc: "", internshipDuration: "", stipend: "", bond: "", joinDate: "",
      eligibleBatches: [], eligibleCourses: [],
      selectionProcess: "", driveDate: "", registrationLink: "",
      contactName: "", contactEmail: "", contactMobile: "", additionalInfo: "",
    });
    setErrors({});
  };

  // One shared input style — used on all inputs and textareas
  const inputStyle = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1 focus:outline-none focus:border-red-400";

  const batches = ["2025", "2026", "2027", "2028"];

  const courses = [
    "B.Tech CS", "B.Tech IT", "B.Tech ECE",
    "Civil", "Electrical", "B.Pharm",
    "BCA", "MCA", "MBA",
    "M.Tech", "BBA", "Other",
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">

      {/* Page Title */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 py-5 text-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Campus Placement Registration Form</h1>
        <p className="text-xs text-gray-400 mt-1">RK University, Rajkot – Training & Placement Cell</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5">

        {/* ── Section 1: Contact Information ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Section title */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Contact Information</h2>
          </div>
          {/* Section content */}
          <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm font-semibold text-gray-800">Dr. Vishal Doshi</p>
              <p className="text-xs text-gray-500">Head of Training & Placement Cell</p>
              <p className="text-xs text-gray-600 mt-2 flex items-center gap-1.5"><Phone size={11} className="text-red-500" /> +91 (0) 4329</p>
              <p className="text-xs text-gray-600 flex items-center gap-1.5"><Mail size={11} className="text-red-500" /> vishal.doshi@rku.ac.in</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm font-semibold text-gray-800">Mr. Osho Shah</p>
              <p className="text-xs text-gray-500">Assistant Training & Placement Officer</p>
              <p className="text-xs text-gray-600 mt-2 flex items-center gap-1.5"><Phone size={11} className="text-red-500" /> +91 (0) 42138</p>
              <p className="text-xs text-gray-600 flex items-center gap-1.5"><Mail size={11} className="text-red-500" /> osho.shah@rku.ac.in</p>
            </div>

          </div>
        </div>

        {/* ── Section 2: Company Details ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Company Details</h2>
          </div>
          <div className="px-6 py-5 space-y-4">

            <div>
              <label className="text-sm text-gray-600">Email Address <span className="text-red-500">*</span></label>
              <input name="email" type="email" className={inputStyle} value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Company Name <span className="text-red-500">*</span></label>
              <input name="companyName" className={inputStyle} value={formData.companyName} onChange={handleChange} />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Job Location <span className="text-red-500">*</span></label>
              <input name="jobLocation" className={inputStyle} value={formData.jobLocation} onChange={handleChange} />
              {errors.jobLocation && <p className="text-red-500 text-xs mt-1">{errors.jobLocation}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Company Website URL <span className="text-red-500">*</span></label>
              <input name="website" className={inputStyle} value={formData.website} onChange={handleChange} />
              {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Short Company Description</label>
              <textarea name="description" rows={4} className={inputStyle} value={formData.description} onChange={handleChange} />
            </div>

          </div>
        </div>

        {/* ── Section 3: Job Role & Compensation ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Job Role & Compensation</h2>
          </div>
          <div className="px-6 py-5 space-y-4">

            <div>
              <label className="text-sm text-gray-600">Job Position <span className="text-red-500">*</span></label>
              <input name="jobPosition" placeholder="e.g., Software Developer, Marketing Executive" className={inputStyle} value={formData.jobPosition} onChange={handleChange} />
              {errors.jobPosition && <p className="text-red-500 text-xs mt-1">{errors.jobPosition}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Annual CTC <span className="text-red-500">*</span></label>
              <input name="ctc" placeholder="e.g., 3,80,124" className={inputStyle} value={formData.ctc} onChange={handleChange} />
              {errors.ctc && <p className="text-red-500 text-xs mt-1">{errors.ctc}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Internship/Training Duration (In Months)</label>
              <input name="internshipDuration" className={inputStyle} value={formData.internshipDuration} onChange={handleChange} />
            </div>

            <div>
              <label className="text-sm text-gray-600">Stipend During Internship (Per Month)</label>
              <input name="stipend" placeholder="e.g., ₹11,200" className={inputStyle} value={formData.stipend} onChange={handleChange} />
            </div>

            <div>
              <label className="text-sm text-gray-600">Bond (If Any)</label>
              <input name="bond" placeholder="e.g., 2 years or No" className={inputStyle} value={formData.bond} onChange={handleChange} />
            </div>

            <div>
              <label className="text-sm text-gray-600">Date of Joining <span className="text-red-500">*</span></label>
              <input name="joinDate" type="date" className={inputStyle} value={formData.joinDate} onChange={handleChange} />
              {errors.joinDate && <p className="text-red-500 text-xs mt-1">{errors.joinDate}</p>}
            </div>

          </div>
        </div>

        {/* ── Section 4: Eligibility Criteria ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">4</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Eligibility Criteria</h2>
          </div>
          <div className="px-6 py-5 space-y-5">

            {/* Batches */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Eligible Batch</p>
              <div className="flex flex-wrap gap-4">
                {batches.map((batch) => (
                  <label key={batch} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-red-600"
                      checked={formData.eligibleBatches.includes(batch)}
                      onChange={() => handleCheckbox("eligibleBatches", batch)}
                    />
                    {batch}
                  </label>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Eligible Courses</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {courses.map((course) => (
                  <label key={course} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-red-600"
                      checked={formData.eligibleCourses.includes(course)}
                      onChange={() => handleCheckbox("eligibleCourses", course)}
                    />
                    {course}
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Section 5: Selection Process ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">5</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Selection Process</h2>
          </div>
          <div className="px-6 py-5 space-y-4">

            <div>
              <label className="text-sm text-gray-600">Selection Process <span className="text-red-500">*</span></label>
              <textarea
                name="selectionProcess"
                rows={4}
                placeholder="Describe the selection process (e.g., Written Test, Technical Interview, HR Interview)"
                className={inputStyle}
                value={formData.selectionProcess}
                onChange={handleChange}
              />
              {errors.selectionProcess && <p className="text-red-500 text-xs mt-1">{errors.selectionProcess}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Expected Date of Campus Drive <span className="text-red-500">*</span></label>
              <input name="driveDate" type="date" className={inputStyle} value={formData.driveDate} onChange={handleChange} />
              {errors.driveDate && <p className="text-red-500 text-xs mt-1">{errors.driveDate}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Registration Link (Optional)</label>
              <input name="registrationLink" placeholder="https://..." className={inputStyle} value={formData.registrationLink} onChange={handleChange} />
            </div>

          </div>
        </div>

        {/* ── Section 6: Contact Person Details ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">6</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Contact Person Details</h2>
          </div>
          <div className="px-6 py-5 space-y-4">

            <div>
              <label className="text-sm text-gray-600">Contact Person Name <span className="text-red-500">*</span></label>
              <input name="contactName" className={inputStyle} value={formData.contactName} onChange={handleChange} />
              {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Contact Person Email ID</label>
              <input name="contactEmail" type="email" className={inputStyle} value={formData.contactEmail} onChange={handleChange} />
              {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Contact Person Mobile No. <span className="text-red-500">*</span></label>
              <input name="contactMobile" type="tel" placeholder="10-digit number" className={inputStyle} value={formData.contactMobile} onChange={handleChange} />
              {errors.contactMobile && <p className="text-red-500 text-xs mt-1">{errors.contactMobile}</p>}
            </div>

          </div>
        </div>

        {/* ── Section 7: Upload Documents ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">7</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Upload Documents</h2>
          </div>
          <div className="px-6 py-5">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Drop files here or click to browse</p>
              <p className="text-xs text-gray-400 mb-4">Upload up to 10 files, Max 10MB each</p>
              <label className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded cursor-pointer">
                Choose Files
                <input type="file" multiple className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* ── Section 8: Additional Details ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">8</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Additional Details</h2>
          </div>
          <div className="px-6 py-5">
            <label className="text-sm text-gray-600">Additional Information</label>
            <textarea
              name="additionalInfo"
              rows={3}
              placeholder="Any additional information or special requirements"
              className={inputStyle}
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ── Buttons ── */}
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