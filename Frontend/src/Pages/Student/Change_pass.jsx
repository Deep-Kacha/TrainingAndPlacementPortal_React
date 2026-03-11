import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Changepass = () => {
    const navigate = useNavigate();

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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

    const checkRequirement = (type) => {
        const val = passwords.new;
        switch (type) {
            case "length": return val.length >= 8;
            case "upper": return /[A-Z]/.test(val);
            case "lower": return /[a-z]/.test(val);
            case "number": return /\d/.test(val);
            case "special": return /[!@#$%^&*(),.?":{}|<>]/.test(val);
            default: return false;
        }
    };

    const handleSubmit = (e) => {
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
            alert("Password successfully verified and updated!");
            setPasswords({ current: "", new: "", confirm: "" });
        }
    };

    return (
        <div className="w-full">
            {/* Header */}
            <header className="page-header flex justify-between items-start mb-8">
                <div>
                    <h1 className="page-title text-[#e7000b] text-[2rem] font-bold m-0 mb-2">Change Password</h1>
                    <p className="page-subtitle text-[#666] text-base m-0">Update your account password for better security.</p>
                </div>
            </header>

            {/* Form Container */}
            <div className="flex justify-center">
                <div className="bg-[#ece6da] border-[1.5px] border-[#e7000b] p-6 md:p-8 rounded-[12px] shadow-sm w-full max-w-lg">
                    {/* Current Password */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-[#333] mb-2">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrent ? "text" : "password"}
                                name="current"
                                value={passwords.current}
                                onChange={handleChange}
                                placeholder="Enter current password"
                                className={`w-full p-3 rounded-lg border outline-none text-[#333] bg-white ${errors.current ? "border-red-500" : "border-[#e0d8cc] focus:border-[#e7000b]"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showCurrent ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                        {errors.current && <p className="text-red-500 text-xs mt-1">{errors.current}</p>}
                    </div>

                    {/* New Password */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-[#333] mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                name="new"
                                value={passwords.new}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className={`w-full p-3 rounded-lg border outline-none text-[#333] bg-white ${errors.new ? "border-red-500" : "border-[#e0d8cc] focus:border-[#e7000b]"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showNew ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                        {errors.new && <p className="text-red-500 text-xs mt-1">{errors.new}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-[#333] mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirm"
                                value={passwords.confirm}
                                onChange={handleChange}
                                placeholder="Re-Enter new password"
                                className={`w-full p-3 rounded-lg border outline-none text-[#333] bg-white ${errors.confirm ? "border-red-500" : "border-[#e0d8cc] focus:border-[#e7000b]"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                        {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-white border border-[#e0d8cc] p-4 rounded-lg mb-5 text-sm">
                        <p className="font-bold text-[#333] mb-2">
                            Password requirements:
                        </p>
                        <ul className="space-y-1 text-[#666]">
                            <li className={checkRequirement("length") ? "text-green-600 font-medium" : ""}>
                                {checkRequirement("length") ? "✔" : "○"} At least 8 characters long
                            </li>
                            <li className={checkRequirement("upper") && checkRequirement("lower") ? "text-green-600 font-medium" : ""}>
                                {checkRequirement("upper") && checkRequirement("lower") ? "✔" : "○"} Contains uppercase and lowercase letters
                            </li>
                            <li className={checkRequirement("number") ? "text-green-600 font-medium" : ""}>
                                {checkRequirement("number") ? "✔" : "○"} Contains at least one number
                            </li>
                            <li className={checkRequirement("special") ? "text-green-600 font-medium" : ""}>
                                {checkRequirement("special") ? "✔" : "○"} Contains at least one special character
                            </li>
                        </ul>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right text-sm mb-5">
                        <button
                            className="text-[#3498db] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
                            onClick={() => navigate("/student/ForgotPassword")}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Update Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#e7000b] text-white py-3 rounded-lg mb-3 font-bold uppercase transition-all hover:bg-red-700 border-none cursor-pointer"
                    >
                        Update Password
                    </button>

                    {/* Cancel */}
                    <button
                        className="w-full bg-transparent border border-gray-400 text-[#333] py-3 rounded-lg font-bold uppercase transition-all hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/student/dashboard")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Changepass;