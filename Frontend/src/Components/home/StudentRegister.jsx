// StudentRegister.jsx
// Refactored: state + validation live here; UI is fully delegated to section components.
// alert() replaced with inline toast for better UX.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoSection    from "./student/Personalinfosection";
import AcademicDetailsSection from "./student/Academicdetailssection";
import ParentInfoSection      from "./student/Parentinfosection";
import AddressSection         from "./student/Addresssection";
import ConsentPaymentSection  from "./student/ConsentPaymentSection";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const INITIAL_STATE = {
  enrollment: "", name: "", branch: "", semester: "",
  universityEmail: "", personalEmail: "", password: "", confirmPassword: "", mobile: "",
  tenth: "", twelfth: "", cgpa: "", backlogs: "",
  parentName: "", parentEmail: "", parentMobile: "",
  currentAddress: "", permanentAddress: "", city: "", state: "", pincode: "",
  consentForm: null, paymentProof: null,
};

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData,     setFormData]     = useState(INITIAL_STATE);
  const [errors,       setErrors]       = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast,        setToast]        = useState({ visible: false, message: "", ok: true });
  const [paymentDetails, setPaymentDetails] = useState(null);

  const showToast = (message, ok = true) => {
    setToast({ visible: true, message, ok });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 5000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handlePaymentSuccess = (details) => {
    setPaymentDetails(details);
    showToast("Payment Verified! You can now submit your registration.", true);
  };

  const validateForm = () => {
    let newErrors = {};

    // Payment validation
    if (!paymentDetails) {
      newErrors.payment = "Please complete the online payment first.";
    }

    // Personal
    if (!formData.enrollment)      newErrors.enrollment      = "Enrollment number is required";
    if (!formData.name)            newErrors.name            = "Full name is required";
    if (!formData.branch)          newErrors.branch          = "Branch is required";
    if (!formData.semester)        newErrors.semester        = "Semester is required";
    if (!formData.universityEmail) {
      newErrors.universityEmail = "University email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.universityEmail)) {
      newErrors.universityEmail = "Invalid email format";
    }
    if (!formData.personalEmail)   newErrors.personalEmail   = "Personal email is required";
    if (!formData.password)        newErrors.password        = "Password is required";
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

    // Academic
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

    // Parent
    if (!formData.parentName)  newErrors.parentName  = "Parent name is required";
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

    // Address
    if (!formData.currentAddress)   newErrors.currentAddress   = "Current address is required";
    if (!formData.permanentAddress) newErrors.permanentAddress = "Permanent address is required";
    if (!formData.city)             newErrors.city             = "City is required";
    if (!formData.state)            newErrors.state            = "State is required";
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    // Files
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
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setPaymentDetails(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast(errors.payment || "Please fill in all required fields correctly.", false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataPayload = new FormData();
      formDataPayload.append("name",             formData.name);
      formDataPayload.append("universityEmail",  formData.universityEmail);
      formDataPayload.append("password",         formData.password);
      formDataPayload.append("enrollment",       formData.enrollment);
      formDataPayload.append("branch",           formData.branch);
      formDataPayload.append("semester",         formData.semester);
      formDataPayload.append("cgpa",             formData.cgpa);
      formDataPayload.append("mobile",           formData.mobile);
      formDataPayload.append("personalEmail",    formData.personalEmail);
      formDataPayload.append("tenth",            formData.tenth);
      formDataPayload.append("twelfth",          formData.twelfth);
      formDataPayload.append("backlogs",         formData.backlogs || 0);
      formDataPayload.append("parentName",       formData.parentName);
      formDataPayload.append("parentEmail",      formData.parentEmail);
      formDataPayload.append("parentMobile",     formData.parentMobile);
      formDataPayload.append("currentAddress",   formData.currentAddress);
      formDataPayload.append("permanentAddress", formData.permanentAddress);
      formDataPayload.append("city",             formData.city);
      formDataPayload.append("state",            formData.state);
      formDataPayload.append("pincode",          formData.pincode);

      // Add Payment Details
      if (paymentDetails?.is_demo_bypass) {
        formDataPayload.append("is_demo_bypass", "true");
      } else {
        formDataPayload.append("razorpay_order_id", paymentDetails?.razorpay_order_id);
        formDataPayload.append("razorpay_payment_id", paymentDetails?.razorpay_payment_id);
        formDataPayload.append("razorpay_signature", paymentDetails?.razorpay_signature);
      }

      if (formData.consentForm)  formDataPayload.append("consentForm",  formData.consentForm);
      if (formData.paymentProof) formDataPayload.append("paymentProof", formData.paymentProof);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formDataPayload   // Do NOT set Content-Type — browser sets it with boundary
      });
      const data = await response.json();

      if (response.ok) {
        showToast(data.message || "Registration successful! Your account is pending admin approval.", true);
        handleClear();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => navigate("/"), 3000);
      } else {
        showToast(data.error || "Registration failed. Please try again.", false);
      }
    } catch {
      showToast("Network error. Please check your connection and try again.", false);
    } finally {
      setIsSubmitting(false);
    }
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
          <h2 className="text-2xl font-bold text-gray-800">Student Registration</h2>
          <p className="text-gray-500 text-sm mt-2">
            Fill out the form below to register for Placements.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoSection
            formData={formData} errors={errors} handleChange={handleChange}
          />

          <AcademicDetailsSection
            formData={formData} errors={errors} handleChange={handleChange}
          />

          <ParentInfoSection
            formData={formData} errors={errors} handleChange={handleChange}
          />

          <AddressSection
            formData={formData} errors={errors} handleChange={handleChange}
          />

          <ConsentPaymentSection
            formData={formData} errors={errors} handleChange={handleChange}
            onPaymentSuccess={handlePaymentSuccess}
          />

          {/* Submit */}
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
              After registration, admin will verify your payment and eligibility criteria.
              After verification you can access the portal.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentRegister;