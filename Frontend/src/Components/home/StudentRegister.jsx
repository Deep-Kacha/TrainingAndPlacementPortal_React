import React, { useState } from "react";

const StudentRegistration = () => {

  const [formData, setFormData] = useState({
    // Personal Information
    enrollment: "",
    name: "",
    branch: "",
    semester: "",
    universityEmail: "",
    personalEmail: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    // Academic Details
    tenth: "",
    twelfth: "",
    cgpa: "",
    backlogs: "",
    // Parent / Guardian
    parentName: "",
    parentEmail: "",
    parentMobile: "",
    // Address
    currentAddress: "",
    permanentAddress: "",
    city: "",
    state: "",
    pincode: "",
    // File Uploads
    consentForm: null,
    paymentProof: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // If it's a file input, save the file. Otherwise save the text value.
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const validateForm = () => {
    let newErrors = {};

    // Personal checks
    if (!formData.enrollment)
      newErrors.enrollment = "Enrollment number is required";

    if (!formData.name)
      newErrors.name = "Full name is required";

    if (!formData.branch)
      newErrors.branch = "Branch is required";

    if (!formData.semester)
      newErrors.semester = "Semester is required";

    if (!formData.universityEmail) {
      newErrors.universityEmail = "University email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.universityEmail)) {
      newErrors.universityEmail = "Invalid email format";
    }

    if (!formData.personalEmail)
      newErrors.personalEmail = "Personal email is required";

    if (!formData.password)
      newErrors.password = "Password is required";

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    // Academic checks
    if (!formData.tenth) {
      newErrors.tenth = "10th percentage is required";
    } else if (formData.tenth < 0 || formData.tenth > 100) {
      newErrors.tenth = "Must be between 0 and 100";
    }

    if (!formData.twelfth) {
      newErrors.twelfth = "12th percentage is required";
    } else if (formData.twelfth < 0 || formData.twelfth > 100) {
      newErrors.twelfth = "Must be between 0 and 100";
    }

    if (!formData.cgpa) {
      newErrors.cgpa = "CGPA is required";
    } else if (formData.cgpa < 0 || formData.cgpa > 10) {
      newErrors.cgpa = "CGPA must be between 0 and 10";
    }

    // Parent checks
    if (!formData.parentName)
      newErrors.parentName = "Parent name is required";

    if (!formData.parentEmail) {
      newErrors.parentEmail = "Parent email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.parentEmail = "Invalid email format";
    }

    if (!formData.parentMobile) {
      newErrors.parentMobile = "Parent mobile is required";
    } else if (!/^[0-9]{10}$/.test(formData.parentMobile)) {
      newErrors.parentMobile = "Must be 10 digits";
    }

    // Address checks
    if (!formData.currentAddress)
      newErrors.currentAddress = "Current address is required";

    if (!formData.permanentAddress)
      newErrors.permanentAddress = "Permanent address is required";

    if (!formData.city)
      newErrors.city = "City is required";

    if (!formData.state)
      newErrors.state = "State is required";

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    // File checks
    if (!formData.consentForm) {
      newErrors.consentForm = "Consent form is required";
    } else if (formData.consentForm.type !== "application/pdf") {
      newErrors.consentForm = "Only PDF format is allowed";
    }

    if (!formData.paymentProof) {
      newErrors.paymentProof = "Payment proof is required";
    } else if (!formData.paymentProof.type.startsWith("image/")) {
      newErrors.paymentProof = "Only image format is allowed";
    }

    setErrors(newErrors);
    // If newErrors is empty, form is valid → return true
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page from refreshing
    if (validateForm()) {
      console.log("Form Submitted:", formData);
      // TODO: Replace console.log with your API call later
      // Example: axios.post("/api/student/register", formData)
    }
  };

  // -------------------------------------------
  // Shared input style — used on all inputs
  // Copy-paste this on every input/select/textarea
  const inputStyle = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1 focus:outline-none focus:border-red-400";

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">

        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Student Registration</h2>
          <p className="text-gray-500 text-sm mt-2">
            Fill out the form below to register for Placements.
          </p>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-6">


          {/* SECTION 1 — Personal Information */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

            {/* Section Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800">Personal Information</h3>
            </div>

            {/* Section Fields — 2 columns on desktop, 1 on mobile */}
            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-gray-600">
                  Enrollment Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="enrollment"
                  placeholder="Enter your enrollment number"
                  className={inputStyle}
                  value={formData.enrollment}
                  onChange={handleChange}
                />
                {/* Show error only if it exists */}
                {errors.enrollment && <p className="text-red-500 text-xs mt-1">{errors.enrollment}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  placeholder="Enter your full name"
                  className={inputStyle}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Branch <span className="text-red-500">*</span>
                </label>
                {/* Select dropdown */}
                <select
                  name="branch"
                  className={inputStyle}
                  value={formData.branch}
                  onChange={handleChange}
                >
                  <option value="">Select your branch</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="CE">CE</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">ME</option>
                </select>
                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Current Semester <span className="text-red-500">*</span>
                </label>
                <select
                  name="semester"
                  className={inputStyle}
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="">Select semester</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                {errors.semester && <p className="text-red-500 text-xs mt-1">{errors.semester}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  University Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="universityEmail"
                  type="email"
                  placeholder="yourname@rku.ac.in"
                  className={inputStyle}
                  value={formData.universityEmail}
                  onChange={handleChange}
                />
                {errors.universityEmail && <p className="text-red-500 text-xs mt-1">{errors.universityEmail}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Personal Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="personalEmail"
                  type="email"
                  placeholder="yourname@gmail.com"
                  className={inputStyle}
                  value={formData.personalEmail}
                  onChange={handleChange}
                />
                {errors.personalEmail && <p className="text-red-500 text-xs mt-1">{errors.personalEmail}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className={inputStyle}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  className={inputStyle}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  className={inputStyle}
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>

            </div>
          </div>


          {/* SECTION 2 — Academic Details*/}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800">Academic Details</h3>
            </div>

            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-gray-600">
                  10th Percentage <span className="text-red-500">*</span>
                </label>
                <input
                  name="tenth"
                  type="number"
                  placeholder="e.g. 85.50"
                  className={inputStyle}
                  value={formData.tenth}
                  onChange={handleChange}
                />
                {errors.tenth && <p className="text-red-500 text-xs mt-1">{errors.tenth}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  12th Percentage <span className="text-red-500">*</span>
                </label>
                <input
                  name="twelfth"
                  type="number"
                  placeholder="e.g. 82.00"
                  className={inputStyle}
                  value={formData.twelfth}
                  onChange={handleChange}
                />
                {errors.twelfth && <p className="text-red-500 text-xs mt-1">{errors.twelfth}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Current CGPA <span className="text-red-500">*</span>
                </label>
                <input
                  name="cgpa"
                  type="number"
                  placeholder="e.g. 7.50"
                  className={inputStyle}
                  value={formData.cgpa}
                  onChange={handleChange}
                />
                {errors.cgpa && <p className="text-red-500 text-xs mt-1">{errors.cgpa}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">Active Backlogs (if any)</label>
                <input
                  name="backlogs"
                  type="number"
                  placeholder="0"
                  className={inputStyle}
                  value={formData.backlogs}
                  onChange={handleChange}
                />
                {/* No * = not required, so no error needed */}
              </div>

            </div>
          </div>


          {/* SECTION 3 — Parent / Guardian Information */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800">Parent / Guardian Information</h3>
            </div>

            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-gray-600">
                  Parent Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="parentName"
                  placeholder="Enter parent name"
                  className={inputStyle}
                  value={formData.parentName}
                  onChange={handleChange}
                />
                {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Parent Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="parentEmail"
                  type="email"
                  placeholder="Enter parent email"
                  className={inputStyle}
                  value={formData.parentEmail}
                  onChange={handleChange}
                />
                {errors.parentEmail && <p className="text-red-500 text-xs mt-1">{errors.parentEmail}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Parent Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="parentMobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  className={inputStyle}
                  value={formData.parentMobile}
                  onChange={handleChange}
                />
                {errors.parentMobile && <p className="text-red-500 text-xs mt-1">{errors.parentMobile}</p>}
              </div>

            </div>
          </div>


          {/* SECTION 4 — Address */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-800">Address</h3>
            </div>

            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-gray-600">
                  Current Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="currentAddress"
                  placeholder="Enter current address"
                  className={inputStyle}
                  value={formData.currentAddress}
                  onChange={handleChange}
                />
                {errors.currentAddress && <p className="text-red-500 text-xs mt-1">{errors.currentAddress}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="permanentAddress"
                  placeholder="Enter permanent address"
                  className={inputStyle}
                  value={formData.permanentAddress}
                  onChange={handleChange}
                />
                {errors.permanentAddress && <p className="text-red-500 text-xs mt-1">{errors.permanentAddress}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  name="city"
                  placeholder="Enter city"
                  className={inputStyle}
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  name="state"
                  placeholder="Enter state"
                  className={inputStyle}
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  name="pincode"
                  placeholder="6-digit pincode"
                  className={inputStyle}
                  value={formData.pincode}
                  onChange={handleChange}
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>

            </div>
          </div>


          {/* SECTION 5 — Consent & Payment Upload */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">5</span>
              </div>
              <h3 className="font-semibold text-gray-800">Consent & Payment</h3>
            </div>

            <div className="px-6 py-5 space-y-6">

              {/* Upload 1 — Consent Form (PDF) */}
              <div>
                <label className="text-sm text-gray-600">
                  Consent Form <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mb-3">Only PDF format allowed</p>
                  {/* Hidden file input triggered by the button label */}
                  <label className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded cursor-pointer">
                    Choose File
                    <input
                      type="file"
                      name="consentForm"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
                  {/* Show file name after selection */}
                  {formData.consentForm && (
                    <p className="text-xs text-green-600 mt-2">✓ {formData.consentForm.name}</p>
                  )}
                </div>
                {errors.consentForm && <p className="text-red-500 text-xs mt-1">{errors.consentForm}</p>}
              </div>

              {/* Upload 2 — Payment Proof (Image) */}
              <div>
                <label className="text-sm text-gray-600">
                  Payment Proof <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-400 mt-0.5 mb-1">
                  For online payment upload screenshot · For offline payment upload cheque photo
                </p>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mb-3">JPG / PNG format allowed</p>
                  <label className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded cursor-pointer">
                    Choose File
                    <input
                      type="file"
                      name="paymentProof"
                      accept="image/*"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
                  {formData.paymentProof && (
                    <p className="text-xs text-green-600 mt-2">✓ {formData.paymentProof.name}</p>
                  )}
                </div>
                {errors.paymentProof && <p className="text-red-500 text-xs mt-1">{errors.paymentProof}</p>}
              </div>

            </div>
          </div>


          {/* SUBMIT BUTTON */}
          <div className="text-center pb-6">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-md font-medium shadow"
            >
              Submit Form
            </button>
            <p className="text-xs text-gray-400 mt-3 max-w-md mx-auto">
              After registration, admin will verify your payment and eligibility criteria.
              After verification you can access the portal.
            </p>
          </div>

        </form>
      </div>
    </section>
  );
};

export default StudentRegistration;