import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const StudChangePass = () => {
    const navigate = useNavigate();

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const [errors, setErrors] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
    };

    const validateField = (name, value, allPasswords) => {
        let error = "";
        if (name === "current") {
            if (!value) error = "Current password is required.";
        } else if (name === "new") {
            if (!value) error = "New password is required.";
            else if (value.length < 8) error = "Must be at least 8 characters.";
            else if (!/[A-Z]/.test(value)) error = "Must contain an uppercase letter.";
            else if (!/[a-z]/.test(value)) error = "Must contain a lowercase letter.";
            else if (!/\d/.test(value)) error = "Must contain a number.";
            else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = "Must contain a special character.";
        } else if (name === "confirm") {
            if (!value) error = "Confirm password is required.";
            else if (value !== allPasswords.new) error = "Passwords do not match.";
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedPasswords = { ...passwords, [name]: value };
        setPasswords(updatedPasswords);

        const error = validateField(name, value, updatedPasswords);
        setErrors((prev) => ({ ...prev, [name]: error }));

        if (name === "new" && updatedPasswords.confirm) {
            const confirmError = validateField("confirm", updatedPasswords.confirm, updatedPasswords);
            setErrors((prev) => ({ ...prev, [name]: error, confirm: confirmError }));
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentErr = validateField("current", passwords.current, passwords);
        const newErr = validateField("new", passwords.new, passwords);
        const confirmErr = validateField("confirm", passwords.confirm, passwords);

        setErrors({
            current: currentErr,
            new: newErr,
            confirm: confirmErr
        });

        if (!currentErr && !newErr && !confirmErr && passwords.current && passwords.new && passwords.confirm) {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("/api/student/change-password", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        currentPassword: passwords.current,
                        newPassword: passwords.new
                    })
                });

                const result = await res.json();
                if (result.success) {
                    showToast("Password updated successfully!", "success");
                    setPasswords({ current: "", new: "", confirm: "" });
                } else {
                    showToast(result.error || "Failed to update password.", "error");
                }
            } catch (error) {
                showToast("Network error. Please try again.", "error");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
                Change Password
            </h1>
            <p className="text-gray-600 mb-8">
                Update your account password for better security.
            </p>

            <div className="flex justify-center">

                <form onSubmit={handleSubmit} className="bg-[#d8cfc2] p-8 rounded-xl shadow-lg w-full max-w-md">

                    <h2 className="text-xl font-bold text-center mb-2">
                        Security Settings
                    </h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        Renew your credentials
                    </p>

                    {/* Toast */}
                    {toast.visible && (
                        <div className={`mb-6 p-3 rounded-md text-sm font-medium border ${
                            toast.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
                        }`}>
                            {toast.message}
                        </div>
                    )}

                    {/* Current Password */}
                    <div className="mb-4">
                        <label className="text-sm font-medium">Current Password</label>
                        <div className="relative mt-1">
                            <input
                                type={showCurrent ? "text" : "password"}
                                name="current"
                                value={passwords.current}
                                onChange={handleChange}
                                placeholder="Enter current password"
                                className={`w-full p-2 rounded-md border ${errors.current ? "border-red-500" : ""}`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                onClick={() => setShowCurrent(!showCurrent)}
                            >
                                {showCurrent ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.current && <p className="text-red-500 text-xs mt-1">{errors.current}</p>}
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                        <label className="text-sm font-medium">New Password</label>
                        <div className="relative mt-1">
                            <input
                                type={showNew ? "text" : "password"}
                                name="new"
                                value={passwords.new}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className={`w-full p-2 rounded-md border ${errors.new ? "border-red-500" : ""}`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                onClick={() => setShowNew(!showNew)}
                            >
                                {showNew ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.new && <p className="text-red-500 text-xs mt-1">{errors.new}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <div className="relative mt-1">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirm"
                                value={passwords.confirm}
                                onChange={handleChange}
                                placeholder="Re-enter new password"
                                className={`w-full p-2 rounded-md border ${errors.confirm ? "border-red-500" : ""}`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
                    </div>



                    {/* Forgot Password Link */}
                    <div className="text-right text-sm mb-4">
                        <button
                            type="button"
                            className="text-gray-700 hover:underline"
                            onClick={() => navigate("/StudForgotPassword")}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Actions */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-3 font-semibold shadow-sm"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-full border border-black py-2 rounded-md hover:bg-gray-100 transition text-sm font-medium"
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>
    );
};

export default StudChangePass;