import React, { useState } from "react";

const StudentRegistration = () => {

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const validateForm = () => {

    let newErrors = {};

    // Personal Info
    if (!formData.enrollment)
      newErrors.enrollment = "Enrollment number is required";

    if (!formData.name)
      newErrors.name = "Full name is required";

    if (!formData.branch)
      newErrors.branch = "Branch is required";

    if (!formData.semester)
      newErrors.semester = "Semester is required";

    if (!formData.universityEmail) {
      newErrors.universityEmail = "University email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.universityEmail)) {
      newErrors.universityEmail = "Invalid email format";
    }

    if (!formData.personalEmail)
      newErrors.personalEmail = "Personal email required";

    if (!formData.password)
      newErrors.password = "Password required";

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    // Academic
    if (!formData.tenth) {
      newErrors.tenth = "10th percentage required";
    } else if (formData.tenth < 0 || formData.tenth > 100) {
      newErrors.tenth = "Must be between 0-100";
    }

    if (!formData.twelfth) {
      newErrors.twelfth = "12th percentage required";
    } else if (formData.twelfth < 0 || formData.twelfth > 100) {
      newErrors.twelfth = "Must be between 0-100";
    }

    if (!formData.cgpa) {
      newErrors.cgpa = "CGPA required";
    } else if (formData.cgpa < 0 || formData.cgpa > 10) {
      newErrors.cgpa = "CGPA must be between 0-10";
    }

    // Parent
    if (!formData.parentName)
      newErrors.parentName = "Parent name required";

    if (!formData.parentEmail) {
      newErrors.parentEmail = "Parent email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.parentEmail = "Invalid email";
    }

    if (!formData.parentMobile) {
      newErrors.parentMobile = "Parent mobile required";
    } else if (!/^[0-9]{10}$/.test(formData.parentMobile)) {
      newErrors.parentMobile = "Must be 10 digits";
    }

    // Address
    if (!formData.currentAddress)
      newErrors.currentAddress = "Current address required";

    if (!formData.permanentAddress)
      newErrors.permanentAddress = "Permanent address required";

    if (!formData.city)
      newErrors.city = "City required";

    if (!formData.state)
      newErrors.state = "State required";

    if (!formData.pincode) {
      newErrors.pincode = "Pincode required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Invalid pincode";
    }

    // Files
    if (!formData.consentForm) {
      newErrors.consentForm = "Consent form required";
    } else if (formData.consentForm.type !== "application/pdf") {
      newErrors.consentForm = "Only PDF allowed";
    }

    if (!formData.paymentProof) {
      newErrors.paymentProof = "Payment proof required";
    } else if (!formData.paymentProof.type.startsWith("image/")) {
      newErrors.paymentProof = "Only image allowed";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (validateForm()) {
      console.log("Form Submitted:", formData);
    }

  };

  return (

    <section className="bg-gray-100 py-12">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-10 relative">

          <h2 className="text-3xl font-bold text-gray-800">
            Student Registration
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Fill out the form below to Registration for Placements.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* PERSONAL INFO */}

          <div className="bg-white border rounded-lg p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-red-700 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm">
                1
              </div>

              <h3 className="font-semibold text-gray-800">
                Personal Information
              </h3>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="label">Enrollment Number</label>

                <input
                  name="enrollment"
                  className="input"
                  placeholder="Enter your enrollment number"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.enrollment}
                </p>
              </div>

              <div>
                <label className="label">Full Name</label>

                <input
                  name="name"
                  className="input"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.name}
                </p>
              </div>

              <div>
                <label className="label">Branch</label>

                <select
                  name="branch"
                  className="input"
                  onChange={handleChange}
                >

                  <option value="">
                    Select your branch
                  </option>

                  <option>
                    CSE
                  </option>

                  <option>
                    IT
                  </option>

                  <option>
                    CE
                  </option>

                </select>

                <p className="text-red-500 text-sm">
                  {errors.branch}
                </p>

              </div>

              <div>

                <label className="label">
                  Current Semester
                </label>

                <select
                  name="semester"
                  className="input"
                  onChange={handleChange}
                >

                  <option value="">
                    Select semester
                  </option>

                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>

                </select>

                <p className="text-red-500 text-sm">
                  {errors.semester}
                </p>

              </div>

              <div>

                <label className="label">
                  University Email Address
                </label>

                <input
                  name="universityEmail"
                  className="input"
                  placeholder="Enter your email address"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.universityEmail}
                </p>

              </div>

              <div>

                <label className="label">
                  Personal Email Address
                </label>

                <input
                  name="personalEmail"
                  className="input"
                  placeholder="Enter your email address"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.personalEmail}
                </p>

              </div>

              <div>

                <label className="label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Enter your Password"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>

              </div>

              <div>

                <label className="label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  className="input"
                  placeholder="Enter your Confirm Password"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </p>

              </div>

              <div>

                <label className="label">
                  Mobile Number
                </label>

                <input
                  name="mobile"
                  className="input"
                  placeholder="Enter your mobile number"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.mobile}
                </p>

              </div>

            </div>

          </div>

          {/* Academic */}

          <div className="bg-white border rounded-lg p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-red-700 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm">
                2
              </div>

              <h3 className="font-semibold text-gray-800">
                Academic Details
              </h3>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="label">
                  10th Percentage
                </label>

                <input
                  name="tenth"
                  className="input"
                  placeholder="e.g. 98.28"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.tenth}
                </p>
              </div>

              <div>

                <label className="label">
                  12th Percentage
                </label>

                <input
                  name="twelfth"
                  className="input"
                  placeholder="e.g. 98.28"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.twelfth}
                </p>

              </div>

              <div>

                <label className="label">
                  Current CGPA
                </label>

                <input
                  name="cgpa"
                  className="input"
                  placeholder="e.g. 7.50"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.cgpa}
                </p>

              </div>

              <div>

                <label className="label">
                  Active Backlogs (if any)
                </label>

                <input
                  name="backlogs"
                  className="input"
                  placeholder="1"
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          {/* Parent */}

          <div className="bg-white border rounded-lg p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-red-700 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm">
                3
              </div>

              <h3 className="font-semibold text-gray-800">
                Parent / Guardian Information
              </h3>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="label">
                  Parent Name
                </label>

                <input
                  name="parentName"
                  className="input"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.parentName}
                </p>

              </div>

              <div>

                <label className="label">
                  Parent Email
                </label>

                <input
                  name="parentEmail"
                  className="input"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.parentEmail}
                </p>

              </div>

              <div>

                <label className="label">
                  Mobile Number
                </label>

                <input
                  name="parentMobile"
                  className="input"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.parentMobile}
                </p>

              </div>

            </div>

          </div>

          {/* Address */}

          <div className="bg-white border rounded-lg p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-red-700 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm">
                4
              </div>

              <h3 className="font-semibold text-gray-800">
                Address
              </h3>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="label">
                  Current Address
                </label>

                <input
                  name="currentAddress"
                  className="input"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.currentAddress}
                </p>

              </div>

              <div>

                <label className="label">
                  Permanent Address
                </label>

                <input
                  name="permanentAddress"
                  className="input"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.permanentAddress}
                </p>

              </div>

              <div>

                <label className="label">
                  City
                </label>

                <input
                  name="city"
                  className="input"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.city}
                </p>

              </div>

              <div>

                <label className="label">
                  State
                </label>

                <input
                  name="state"
                  className="input"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.state}
                </p>

              </div>

              <div>

                <label className="label">
                  Pincode
                </label>

                <input
                  name="pincode"
                  className="input"
                  onChange={handleChange}
                />

                <p className="text-red-500 text-sm">
                  {errors.pincode}
                </p>

              </div>

            </div>

          </div>

          {/* Consent & Payment */}

          <div className="bg-white border rounded-lg p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-red-700 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm">
                5
              </div>

              <h3 className="font-semibold text-gray-800">
                Consent & Payment
              </h3>

            </div>

            <div className="space-y-6">

              <label className="label">
                Add Consent Form
              </label>

              <div className="upload-box">

                <p>
                  Click to upload or drag and drop
                </p>

                <span>
                  only in PDF format
                </span>

                <input
                  type="file"
                  name="consentForm"
                  onChange={handleChange}
                />

              </div>

              <p className="text-red-500 text-sm">
                {errors.consentForm}
              </p>

              <label className="label">
                For Online payment upload screenshot of payment and for offline payment upload cheque Photo
              </label>

              <div className="upload-box">

                <p>
                  Click to upload or drag and drop
                </p>

                <span>
                  only in jpg format
                </span>

                <input
                  type="file"
                  name="paymentProof"
                  onChange={handleChange}
                />

              </div>

              <p className="text-red-500 text-sm">
                {errors.paymentProof}
              </p>

            </div>

          </div>

          {/* Submit */}

          <div className="text-center">

            <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-md font-medium shadow">
              Submit Form
            </button>

            <p className="text-xs text-gray-500 mt-4 max-w-lg mx-auto">
              After a registration Admin will verify your payment and eligibility
              criteria. After verification you can access the portal.
            </p>

          </div>

        </form>

      </div>

    </section>

  );

};

export default StudentRegistration;