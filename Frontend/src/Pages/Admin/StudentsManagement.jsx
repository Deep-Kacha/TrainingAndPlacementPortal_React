import { useState, useEffect } from "react";
import { FaUsers, FaSpinner } from "react-icons/fa";
import StudentTable from "../../Components/Admin/StudentMangement/StudentTable";
import Toast from "../../Components/common/Toast";
import useSocketRefresh from "../../hooks/useSocketRefresh";

/**
 * Admin › Students Management page.
 * Responsibilities: fetch data, hold state, pass props to components.
 * All table markup is delegated to StudentTable and its children.
 */
const AdminStudentsManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  // ── Helpers ───────────────────────────────────────────────────────────────

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  /** Normalise field names from either API response shape */
  const normalise = (raw) => ({
    ...raw,
    fullName:        raw.fullName        || raw.name       || "N/A",
    enrollmentNumber:raw.enrollmentNumber|| raw.enrollment || "N/A",
    branch:          raw.branch          || raw.course     || "N/A",
    semester:        raw.semester        || (raw.batch ? raw.batch.replace("Sem ", "") : "N/A"),
    isApproved:      raw.isApproved      ?? raw.approved   ?? false,
    consentFormPath: raw.consentFormPath || null,
    paymentProofPath: raw.paymentProofPath || null,
    personalEmail:   raw.personalEmail   || "N/A",
    tenth:           raw.tenth           || "N/A",
    twelfth:         raw.twelfth         || "N/A",
    backlogs:        raw.backlogs        ?? 0,
    parentName:      raw.parentName      || "N/A",
    parentEmail:     raw.parentEmail     || "N/A",
    parentMobile:    raw.parentMobile    || "N/A",
    currentAddress:  raw.currentAddress  || "N/A",
    permanentAddress:raw.permanentAddress|| "N/A",
    city:            raw.city            || "N/A",
    state:           raw.state           || "N/A",
    pincode:         raw.pincode         || "N/A",
    registeredAt:    raw.registeredAt    || null
  });

  // ── Data fetching ─────────────────────────────────────────────────────────

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const raw = Array.isArray(data) ? data : data.data || [];
        setStudents(raw.map(normalise));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useSocketRefresh('REFRESH_STUDENTS', fetchStudents);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleToggle = async (studentId, isApproved) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = isApproved ? "approve" : "reject";
      const res = await fetch(`/api/admin/students/${studentId}/${endpoint}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success || res.ok) {
        showToast(result.message || (isApproved ? "Student approved." : "Set to pending."), "success");
      } else {
        showToast(result.message || "Operation failed.", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      fetchStudents();
    }
  };

  const handleDelete = async (studentId, fullName) => {
    if (!confirm(`Are you sure you want to delete ${fullName}? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/students/${studentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success || res.ok) {
        showToast(result.message || "Student deleted.", "success");
      } else {
        showToast(result.message || "Delete failed.", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      fetchStudents();
    }
  };

  // Filtered list
  const filteredStudents = students.filter(s => {
    if (filterStatus === "Approved") return s.isApproved;
    if (filterStatus === "Pending") return !s.isApproved;
    return true;
  });

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-red-600">Students Management</h1>
          <p className="text-gray-600 text-sm mt-1 font-medium">
            Manage student registrations and verification docs.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full md:w-64">
           <select 
             value={filterStatus}
             onChange={(e) => setFilterStatus(e.target.value)}
             className="w-full appearance-none p-3 px-4 rounded-lg border bg-white outline-none focus:ring-2 focus:ring-red-200 cursor-pointer text-sm font-bold text-gray-700 shadow-sm"
           >
             <option value="All">All Registrations</option>
             <option value="Pending">Pending Verification</option>
             <option value="Approved">Approved Students</option>
           </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <FaSpinner className="animate-spin text-red-600 text-4xl mx-auto mb-4" />
          <p className="text-gray-500">Loading students...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredStudents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <FaUsers className="text-gray-300 text-5xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {filterStatus === "All" ? "No students registered yet." : `No students found matching "${filterStatus}".`}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {filterStatus === "All" ? "Students will appear here after they register on the portal." : "Try switching your status filter to see other students."}
          </p>
        </div>
      )}

      {/* Data table */}
      {!loading && filteredStudents.length > 0 && (
        <StudentTable
          students={filteredStudents}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
};

export default AdminStudentsManagement;