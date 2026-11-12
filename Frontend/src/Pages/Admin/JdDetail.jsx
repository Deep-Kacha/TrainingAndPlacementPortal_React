import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SectionCard from "../../Components/Admin/CompanyMangement/SectionCard";
import InputField from "../../Components/Admin/CompanyMangement/InputField";
import CheckboxGroup from "../../Components/Admin/CompanyMangement/CheckboxGroup";
import { PORTAL_BRANDING } from "../../demo/demoConfig";
import { FaSpinner } from "react-icons/fa";
import {
  FaAddressBook,
  FaBuilding,
  FaBriefcase,
  FaCheckCircle,
  FaClipboardList,
  FaUserTie
} from "react-icons/fa";

// ─── Constants ────────────────────────────────────────────────────────────────
const BATCH_OPTIONS   = ["2025", "2026", "2027", "2028"];
const COURSE_OPTIONS  = ["B.Tech CS", "B.Tech IT", "Mechanical", "Civil", "Electrical", "BCA", "MCA", "MBA", "M.Sc IT"];

const EMPTY_FORM = {
  email: "", companyName: "", jobLocation: "", website: "", description: "",
  position: "", ctc: "", internshipDuration: "", stipend: "", bond: "", joiningDate: "",
  eligibleBatches: [], eligibleCourses: [],
  selectionProcess: "", driveDate: "", regLink: "",
  contactName: "", contactEmail: "", contactMobile: "",
  additionalDetails: "", fileName: "",
  minCgpa: "0", deadline: ""
};

// ─── DB row → form shape mapper ───────────────────────────────────────────────
const mapRowToForm = (row) => ({
  email:             row.contact_person_email  || "",
  companyName:       row.resolved_company_name || row.company_name || "",
  jobLocation:       row.location              || "",
  website:           row.website               || "",
  description:       row.description           || "",
  position:          row.job_position          || row.job_title || "",
  ctc:               row.ctc_package           || "",
  internshipDuration:row.internship_duration   || "",
  stipend:           row.stipend               || "",
  bond:              row.bond                  || "",
  joiningDate:       row.joining_date ? row.joining_date.split("T")[0] : "",
  eligibleBatches:   row.eligible_batches      || [],
  eligibleCourses:   row.eligible_courses      || [],
  selectionProcess:  row.selection_process     || "",
  driveDate:         row.drive_date ? row.drive_date.split("T")[0] : "",
  regLink:           row.registration_link     || "",
  contactName:       row.contact_person_name   || "",
  contactEmail:      row.contact_person_email  || "",
  contactMobile:     row.contact_person_mobile || "",
  additionalDetails: row.additional_info       || "",
  minCgpa:           row.min_cgpa              || "0",
  deadline:          row.application_deadline ? row.application_deadline.split("T")[0] : ""
});

// ─── Form → API payload mapper ────────────────────────────────────────────────
const mapFormToPayload = (f) => ({
  job_position:          f.position,
  description:           f.description,
  ctc_package:           f.ctc,
  location:              f.jobLocation,
  website:               f.website,
  stipend:               f.stipend,
  bond:                  f.bond,
  joining_date:          f.joiningDate || null,
  eligible_batches:      f.eligibleBatches,
  eligible_courses:      f.eligibleCourses,
  selection_process:     f.selectionProcess,
  drive_date:            f.driveDate || null,
  registration_link:     f.regLink,
  contact_person_name:   f.contactName,
  contact_person_email:  f.contactEmail,
  contact_person_mobile: f.contactMobile,
  additional_info:       f.additionalDetails,
  min_cgpa:              f.minCgpa || 0,
  application_deadline:  f.deadline || null
});

// ─── Subcomponents ────────────────────────────────────────────────────────────
const ContactOfficersList = () => {
  const [officers, setOfficers] = useState([]);
  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const res = await fetch("/api/guest/contact-officers");
        const result = await res.json();
        if (result.success && result.data.length > 0) {
          setOfficers(result.data);
        } else {
          setOfficers(PORTAL_BRANDING.officers);
        }
      } catch {
        // use default fallback
      }
    };
    fetchOfficers();
  }, []);

  return (
    <>
      {officers.map((officer, i) => (
        <div key={i} className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold">{officer.name}</p>
          <p className="text-sm text-gray-600">{officer.department || "Training & Placement Cell"}</p>
          {officer.mobile && <p className="text-sm text-gray-600 mt-1">{officer.mobile}</p>}
          {officer.email && <p className="text-sm text-gray-600 truncate">{officer.email}</p>}
        </div>
      ))}
    </>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
const AdminJdDetail = () => {
  const navigate    = useNavigate();
  const location    = useLocation();
  const jobId  = location.state?.jobId;
  const initMode = location.state?.mode === "edit";

  const [formData,   setFormData]   = useState(EMPTY_FORM);
  const [errors,     setErrors]     = useState({});
  const [isEditing,  setIsEditing]  = useState(initMode);
  const [loading,    setLoading]    = useState(true);
  const [pageError,  setPageError]  = useState("");
  const [saveMsg,    setSaveMsg]    = useState("");
  const [saving,     setSaving]     = useState(false);

  // ── Fetch JD from backend ────────────────────────────────────────────────
  useEffect(() => {
    if (!jobId) {
      setPageError("No job ID supplied. Please navigate here via the Company Management page.");
      setLoading(false);
      return;
    }
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/admin/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) {
          setFormData(mapRowToForm(result.data));
        } else {
          setPageError(result.error || "Failed to load job details.");
        }
      } catch {
        setPageError("Network error while loading job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  // ── Form helpers ─────────────────────────────────────────────────────────
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    if (saveMsg) setSaveMsg("");
  };

  // ── Validation ───────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    const required = ["companyName", "jobLocation", "description", "position", "ctc",
                       "selectionProcess", "driveDate", "contactName"];

    required.forEach(f => {
      if (!formData[f]?.trim()) newErrors[f] = "This field is required.";
    });

    if (!formData.email?.trim())                                       newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))     newErrors.email = "Invalid email format.";

    if (!formData.contactEmail?.trim())                                newErrors.contactEmail = "Contact email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) newErrors.contactEmail = "Invalid email format.";

    if (!formData.website?.trim())                                     newErrors.website = "Website is required.";
    else if (!/^https?:\/\/.*/.test(formData.website))                newErrors.website = "URL must start with http:// or https://";

    if (!formData.contactMobile?.trim())                               newErrors.contactMobile = "Contact mobile is required.";
    else if (!/^\+?[0-9\s-]{10,}$/.test(formData.contactMobile))     newErrors.contactMobile = "Invalid mobile number.";

    if (!formData.eligibleBatches?.length)   newErrors.eligibleBatches  = "Select at least one batch.";
    if (!formData.eligibleCourses?.length)   newErrors.eligibleCourses  = "Select at least one course.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Save Changes ─────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const payload = mapFormToPayload(formData);

      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.success) {
        setIsEditing(false);
        setSaveMsg("✓ Changes saved successfully!");
      } else {
        setSaveMsg("✗ " + (result.error || "Save failed."));
      }
    } catch {
      setSaveMsg("✗ Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Loading / error states ────────────────────────────────────────────────
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <FaSpinner className="animate-spin text-red-600 text-5xl" />
      <p className="text-gray-500">Loading job details...</p>
    </div>
  );

  if (pageError) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
      <p className="text-red-600 font-semibold text-lg">{pageError}</p>
      <button
        onClick={() => navigate(-1)}
        className="border px-6 py-2 rounded-lg hover:bg-gray-50"
      >
        ← Back
      </button>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 relative z-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-red-600">Company Management</h1>
          <p className="text-gray-600 text-sm">Update and verify company details for campus drives.</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
            className={`bg-red-600 text-white px-5 py-2 rounded-lg flex-1 md:flex-none ${
              isEditing ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
            }`}
          >
            Edit Content
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border px-5 py-2 rounded-lg flex-1 md:flex-none hover:bg-gray-50"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Save message banner */}
      {saveMsg && (
        <div className={`mb-4 px-4 py-3 rounded-lg font-medium text-sm ${
          saveMsg.startsWith("✓") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {saveMsg}
        </div>
      )}

      {/* Title block */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 text-center mb-6">
        <h2 className="text-lg font-semibold">Campus Placement Registration Form</h2>
        <p className="text-gray-500 text-sm">
          {PORTAL_BRANDING.institutionName}, {PORTAL_BRANDING.cityState.split(",")[0]} – Training & Placement Cell
        </p>
      </div>

      {/* Contact Information */}
      <SectionCard icon={<FaAddressBook />} title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <ContactOfficersList />
        </div>
      </SectionCard>

      {/* Company Details */}
      <SectionCard icon={<FaBuilding />} title="Company Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputField label="Email Address *" value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)} readOnly={!isEditing} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <InputField label="Company Name *" value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)} readOnly={!isEditing} />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
          </div>
          <div>
            <InputField label="Job Location *" value={formData.jobLocation}
              onChange={(e) => handleChange("jobLocation", e.target.value)} readOnly={!isEditing} />
            {errors.jobLocation && <p className="text-red-500 text-xs mt-1">{errors.jobLocation}</p>}
          </div>
          <div>
            <InputField label="Company Website URL *" value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)} readOnly={!isEditing} />
            {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
          </div>
          <div className="md:col-span-2">
            <textarea
              rows="4"
              placeholder="Short Company Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              readOnly={!isEditing}
              className={`w-full border rounded-lg p-3 outline-none resize-none
                ${!isEditing ? "bg-gray-100 text-gray-500" : "focus:ring-2 focus:ring-red-400"}
                ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
        </div>
      </SectionCard>

      {/* Job Role & Compensation */}
      <SectionCard icon={<FaBriefcase />} title="Job Role & Compensation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputField label="Job Position *" value={formData.position}
              onChange={(e) => handleChange("position", e.target.value)} readOnly={!isEditing} />
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
          </div>
          <div>
            <InputField label="Annual CTC *" value={formData.ctc}
              onChange={(e) => handleChange("ctc", e.target.value)} readOnly={!isEditing} />
            {errors.ctc && <p className="text-red-500 text-xs mt-1">{errors.ctc}</p>}
          </div>
          <div>
            <InputField label="Internship Duration" value={formData.internshipDuration}
              onChange={(e) => handleChange("internshipDuration", e.target.value)} readOnly={!isEditing} />
          </div>
          <div>
            <InputField label="Stipend During Internship" value={formData.stipend}
              onChange={(e) => handleChange("stipend", e.target.value)} readOnly={!isEditing} />
          </div>
          <div>
            <InputField label="Bond" value={formData.bond}
              onChange={(e) => handleChange("bond", e.target.value)} readOnly={!isEditing} />
          </div>
          <div>
            <InputField label="Date of Joining" type="date" value={formData.joiningDate}
              onChange={(e) => handleChange("joiningDate", e.target.value)} readOnly={!isEditing} />
          </div>
        </div>
      </SectionCard>

      {/* Eligibility Criteria */}
      <SectionCard icon={<FaCheckCircle />} title="Eligibility Criteria">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CheckboxGroup
              title="Eligible Batches *"
              options={BATCH_OPTIONS}
              selectedOptions={formData.eligibleBatches}
              onChange={(val) => handleChange("eligibleBatches", val)}
              disabled={!isEditing}
            />
            {errors.eligibleBatches && <p className="text-red-500 text-xs mt-1">{errors.eligibleBatches}</p>}
          </div>
          <div>
            <CheckboxGroup
              title="Eligible Courses *"
              options={COURSE_OPTIONS}
              selectedOptions={formData.eligibleCourses}
              onChange={(val) => handleChange("eligibleCourses", val)}
              disabled={!isEditing}
            />
            {errors.eligibleCourses && <p className="text-red-500 text-xs mt-1">{errors.eligibleCourses}</p>}
          </div>
          <div>
             <InputField 
               label="Minimum CGPA Requirement" 
               type="number" 
               value={formData.minCgpa}
               onChange={(e) => handleChange("minCgpa", e.target.value)} 
               readOnly={!isEditing} 
             />
             <p className="text-gray-400 text-[10px] mt-1 italic">Enter 0 for no minimum requirement.</p>
          </div>
        </div>
      </SectionCard>

      {/* Selection Process */}
      <SectionCard icon={<FaClipboardList />} title="Selection Process">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <textarea
              rows="3"
              placeholder="e.g. 1. Aptitude Test  2. Technical Interview  3. HR Round"
              value={formData.selectionProcess}
              onChange={(e) => handleChange("selectionProcess", e.target.value)}
              readOnly={!isEditing}
              className={`w-full border rounded-lg p-3 outline-none resize-none
                ${!isEditing ? "bg-gray-100 text-gray-500" : "focus:ring-2 focus:ring-red-400"}
                ${errors.selectionProcess ? "border-red-500" : ""}`}
            />
            {errors.selectionProcess && <p className="text-red-500 text-xs mt-1">{errors.selectionProcess}</p>}
          </div>
          <div>
            <InputField label="Expected Date of Campus Drive *" type="date" value={formData.driveDate}
              onChange={(e) => handleChange("driveDate", e.target.value)} readOnly={!isEditing} />
            {errors.driveDate && <p className="text-red-500 text-xs mt-1">{errors.driveDate}</p>}
          </div>
          <div>
            <InputField label="Application Deadline" type="date" value={formData.deadline}
              onChange={(e) => handleChange("deadline", e.target.value)} readOnly={!isEditing} />
          </div>
          <div>
            <InputField label="Registration Link (Optional)" value={formData.regLink}
              onChange={(e) => handleChange("regLink", e.target.value)} readOnly={!isEditing} />
          </div>
        </div>
      </SectionCard>

      {/* Contact Person Details */}
      <SectionCard icon={<FaUserTie />} title="Contact Person Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputField label="Contact Person Name *" value={formData.contactName}
              onChange={(e) => handleChange("contactName", e.target.value)} readOnly={!isEditing} />
            {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
          </div>
          <div>
            <InputField label="Contact Person Email *" value={formData.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)} readOnly={!isEditing} />
            {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
          </div>
          <div>
            <InputField label="Contact Person Mobile *" value={formData.contactMobile}
              onChange={(e) => handleChange("contactMobile", e.target.value)} readOnly={!isEditing} />
            {errors.contactMobile && <p className="text-red-500 text-xs mt-1">{errors.contactMobile}</p>}
          </div>
        </div>
      </SectionCard>

      {/* Additional Details */}
      <SectionCard icon={<FaClipboardList />} title="Additional Details">
        <textarea
          rows="4"
          placeholder="Any additional information or special requirements"
          value={formData.additionalDetails}
          onChange={(e) => handleChange("additionalDetails", e.target.value)}
          readOnly={!isEditing}
          className={`w-full border rounded-lg p-3 outline-none resize-none
            ${!isEditing ? "bg-gray-100 text-gray-500" : "focus:ring-2 focus:ring-red-400"}`}
        />
      </SectionCard>

      {/* Action buttons (visible only while editing) */}
      {isEditing && (
        <div className="flex flex-col-reverse md:flex-row justify-end gap-4 mt-6">
          <button
            onClick={() => { setIsEditing(false); setErrors({}); setSaveMsg(""); }}
            className="border px-6 py-2 rounded-lg hover:bg-gray-50 w-full md:w-auto"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving && <FaSpinner className="animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

    </div>
  );
};

export default AdminJdDetail;