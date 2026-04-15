import { useState, useEffect } from "react";
import JobListPanel from "../../Components/Admin/ManageApplications/JobListPanel";
import StudentTablePanel from "../../Components/Admin/ManageApplications/StudentTablePanel";
import Toast from "../../Components/common/Toast";
import useSocketRefresh from "../../hooks/useSocketRefresh";

/**
 * Admin › Manage Applications page.
 * Responsibilities: fetch data, hold state, pass props down.
 * All UI rendering is delegated to component files.
 */
const ManageApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  // ── Fetch helpers ─────────────────────────────────────────────────────────

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/applications/admin/applied-companies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) setJobs(result.data);
    } catch {
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchStudents = async (job) => {
    setLoadingStudents(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/applications/admin/job/${job.jobPostingId}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) setStudents(result.data);
    } catch {
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  // ── Life-cycle ────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchJobs();
  }, []);

  useSocketRefresh('REFRESH_APPLICATIONS', () => {
    fetchJobs();
    if (selectedJob) fetchStudents(selectedJob);
  });

  // ── Handlers ──────────────────────────────────────────────────────────────

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setStudents([]);
    fetchStudents(job);
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/applications/admin/${applicationId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        showToast(`Status updated to ${newStatus}`, "success");
        if (selectedJob) fetchStudents(selectedJob);
      } else {
        showToast("Failed to update status", "error");
      }
    } catch {
      showToast("Network error", "error");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">Manage Applications</h1>
        <p className="text-gray-600 text-sm md:text-base mt-1 font-medium">
          Review and update application statuses by company.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <JobListPanel
            jobs={jobs}
            loading={loadingJobs}
            selectedJob={selectedJob}
            onSelect={handleJobSelect}
          />
        </div>

        <div className="lg:col-span-2">
          <StudentTablePanel
            selectedJob={selectedJob}
            students={students}
            loading={loadingStudents}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
};

export default ManageApplications;
