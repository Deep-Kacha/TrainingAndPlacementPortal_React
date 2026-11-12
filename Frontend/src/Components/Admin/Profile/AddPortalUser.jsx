import { useState, useEffect } from "react";
import {
  FaEye, FaEyeSlash, FaUserShield, FaCalendarAlt,
  FaTrash, FaToggleOn, FaToggleOff, FaSpinner, FaCheckCircle, FaTimesCircle
} from "react-icons/fa";
import { PORTAL_BRANDING } from "../../../demo/demoConfig";

const SUPER_ADMIN_EMAIL = PORTAL_BRANDING.superAdminEmail;

const AddPortalUser = () => {
  // ── Current user ────────────────────────────────────────────────────────────
  const storedUser   = JSON.parse(localStorage.getItem("user") || "{}");
  const currentEmail = storedUser.email || "";
  const isSuperAdmin = currentEmail === SUPER_ADMIN_EMAIL;

  // ── Form state ────────────────────────────────────────────────────────────
  const [form, setForm]           = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors]       = useState({});
  const [showPass, setShowPass]   = useState(false);
  const [showCfm, setShowCfm]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

  // ── User list state ───────────────────────────────────────────────────────
  const [adminUsers, setAdminUsers]   = useState([]);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // id of user being acted on

  // ── Toast ─────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState({ visible: false, message: "", ok: true });
  const showToast = (message, ok = true) => {
    setToast({ visible: true, message, ok });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 4000);
  };

  // ── Fetch users ───────────────────────────────────────────────────────────
  const fetchAdminUsers = async () => {
    setFetchingUsers(true);
    try {
      const token  = localStorage.getItem("token");
      const res    = await fetch("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } });
      const result = await res.json();
      if (result.success) setAdminUsers(result.data);
    } catch {
      console.error("Failed to fetch admin users");
    } finally {
      setFetchingUsers(false);
    }
  };

  useEffect(() => { fetchAdminUsers(); }, []);

  // ── Form helpers ──────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    const errs = { ...errors };
    if (name === "email") {
      if (!value)                                   errs.email           = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errs.email = "Invalid email";
      else delete errs.email;
    } else if (name === "password") {
      if (!value)          errs.password = "Password is required";
      else if (value.length < 6) errs.password = "Min 6 chars required";
      else delete errs.password;
    } else if (name === "confirmPassword") {
      if (value !== next.password) errs.confirmPassword = "Passwords do not match";
      else                          delete errs.confirmPassword;
    }
    setErrors(errs);
  };

  const handleClear = (clearUser = true) => {
    setForm({ email: "", password: "", confirmPassword: "" });
    setErrors({});
    if (clearUser === true) {
      setCreatedUser(null);
    }
  };

  // ── Add user ──────────────────────────────────────────────────────────────
  const handleAddUser = async () => {
    const errs = {};
    if (!form.email)                             errs.email           = "Email is required";
    if (!form.password)                          errs.password        = "Password is required";
    if (form.password !== form.confirmPassword)  errs.confirmPassword = "Passwords do not match";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setCreatedUser(null);
    try {
      const token  = localStorage.getItem("token");
      const res    = await fetch("/api/admin/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const result = await res.json();
      if (result.success) {
        setCreatedUser(result.data);
        handleClear(false);
        fetchAdminUsers();
        showToast("Portal user added successfully!", true);
      } else {
        showToast(result.error || "Failed to add user.", false);
      }
    } catch {
      showToast("Network error. Please try again.", false);
    } finally {
      setLoading(false);
    }
  };

  // ── Toggle enable/disable ─────────────────────────────────────────────────
  const handleToggle = async (user) => {
    setActionLoading(user.id);
    try {
      const token  = localStorage.getItem("token");
      const res    = await fetch(`/api/admin/users/${user.id}/toggle`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        showToast(result.message, true);
        fetchAdminUsers();
      } else {
        showToast(result.error || "Failed to update status.", false);
      }
    } catch {
      showToast("Network error. Please try again.", false);
    } finally {
      setActionLoading(null);
    }
  };

  // ── Remove user ───────────────────────────────────────────────────────────
  const handleRemove = async (user) => {
    if (!window.confirm(`Remove ${user.email}? This cannot be undone.`)) return;
    setActionLoading(user.id);
    try {
      const token  = localStorage.getItem("token");
      const res    = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        showToast("User removed successfully.", true);
        fetchAdminUsers();
      } else {
        showToast(result.error || "Failed to remove user.", false);
      }
    } catch {
      showToast("Network error. Please try again.", false);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6">

      {/* Toast */}
      {toast.visible && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm text-sm font-medium ${
          toast.ok ? "bg-green-50 border border-green-200 text-green-800"
                   : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {toast.ok ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
          {toast.message}
        </div>
      )}

      {/* ── ADD USER FORM (super admin only) ── */}
      {isSuperAdmin && (
        <div className="bg-[#d8cfc3] rounded-xl p-6 md:p-8 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-4 mb-6">
            Add Another Portal User
          </h2>

          <div className="space-y-5">
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Enter Email Address</label>
              <input
                name="email" value={form.email} onChange={handleChange}
                placeholder="Enter verified email"
                className="w-full rounded-md p-2.5 outline-none bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900 text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Enter Password</label>
              <div className="relative">
                <input
                  name="password" value={form.password} onChange={handleChange}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full rounded-md p-2.5 pr-10 outline-none bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900 text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  type={showCfm ? "text" : "password"}
                  placeholder="Re-enter new password"
                  className="w-full rounded-md p-2.5 pr-10 outline-none bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900 text-sm"
                />
                <button type="button" onClick={() => setShowCfm(!showCfm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCfm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleAddUser} disabled={loading}
              className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 font-medium shadow transition disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
            >
              {loading && <FaSpinner className="animate-spin" />}
              {loading ? "Adding..." : "Add User"}
            </button>
            <button
              onClick={handleClear}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 font-medium shadow-sm transition text-sm"
            >
              Cancel
            </button>
          </div>

          {/* Success credential bubble */}
          {createdUser && (
            <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-bold text-green-800 mb-1">✓ User Created — Save these credentials!</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Email:</span> {createdUser.email}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Password:</span> {createdUser.password}</p>
              <p className="text-xs text-gray-500 mt-2 italic">Password will not be shown again.</p>
            </div>
          )}
        </div>
      )}

      {/* ── ADDED PORTAL USERS LIST ── */}
      <div className="bg-[#d8cfc3] rounded-xl p-6 md:p-8 shadow-sm flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-4 mb-5">
          Added Portal Users
        </h2>

        {fetchingUsers ? (
          <div className="flex items-center justify-center py-6 gap-2 text-gray-500 text-sm">
            <FaSpinner className="animate-spin" /> Loading users...
          </div>
        ) : adminUsers.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4 italic">No portal users found.</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {adminUsers.map((user) => {
              const isSelf    = user.email === currentEmail;
              const isSuper   = user.email === SUPER_ADMIN_EMAIL;
              const isActing  = actionLoading === user.id;
              return (
                <div
                  key={user.id}
                  className={`bg-white/70 rounded-xl p-4 flex items-center gap-3 border shadow-sm transition ${
                    !user.is_approved && !isSuper ? "opacity-60" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className={`p-2.5 rounded-full flex-shrink-0 ${
                    isSuper ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                  }`}>
                    <FaUserShield className="text-base" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                      {isSuper && (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded">
                          SUPER ADMIN
                        </span>
                      )}
                      {!isSuper && (
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          user.is_approved
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-gray-200 text-gray-500 border border-gray-300"
                        }`}>
                          {user.is_approved ? "Active" : "Disabled"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <FaCalendarAlt className="text-[9px]" />
                      Added on {formatDate(user.created_at)}
                    </p>
                  </div>

                  {/* Actions — only super admin sees these, only for non-super non-self users */}
                  {isSuperAdmin && !isSuper && !isSelf && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Toggle enable/disable */}
                      <button
                        onClick={() => handleToggle(user)}
                        disabled={isActing}
                        title={user.is_approved ? "Disable user" : "Enable user"}
                        className={`p-2 rounded-lg transition text-xl ${
                          user.is_approved
                            ? "text-green-600 hover:bg-green-50"
                            : "text-gray-400 hover:bg-gray-100"
                        } disabled:opacity-50`}
                      >
                        {isActing ? (
                          <FaSpinner className="animate-spin text-sm" />
                        ) : user.is_approved ? (
                          <FaToggleOn />
                        ) : (
                          <FaToggleOff />
                        )}
                      </button>

                      {/* Remove user */}
                      <button
                        onClick={() => handleRemove(user)}
                        disabled={isActing}
                        title="Remove user"
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                      >
                        {isActing ? (
                          <FaSpinner className="animate-spin text-sm" />
                        ) : (
                          <FaTrash className="text-sm" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPortalUser;