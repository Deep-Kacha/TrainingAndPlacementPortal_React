import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const StudChangePass = () => {
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
            alert("Password updated successfully!");
            setPasswords({ current: "", new: "", confirm: "" });
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
                Security Settings
            </h1>
            <p className="text-gray-600 mb-8">
                Update your credentials to maintain account safety.
            </p>

            <div className="flex justify-center">
                <div className="w-full max-w-xl bg-[#d8cfc3] p-8 md:p-10 rounded-xl border border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit}>
                        {/* Current Password */}
                        <div className="mb-6">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    name="current"
                                    value={passwords.current}
                                    onChange={handleChange}
                                    placeholder="Enter current password"
                                    className={`w-full p-4 rounded-lg border outline-none text-gray-800 font-semibold transition-all bg-white ${errors.current ? "border-red-500" : "border-gray-300 focus:border-red-600 shadow-sm"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
                                >
                                    {showCurrent ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                            {errors.current && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.current}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* New Password */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNew ? "text" : "password"}
                                        name="new"
                                        value={passwords.new}
                                        onChange={handleChange}
                                        placeholder="New password"
                                        className={`w-full p-4 rounded-lg border outline-none text-gray-800 font-semibold transition-all bg-white ${errors.new ? "border-red-500" : "border-gray-300 focus:border-red-600 shadow-sm"}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
                                    >
                                        {showNew ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                                {errors.new && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.new}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        name="confirm"
                                        value={passwords.confirm}
                                        onChange={handleChange}
                                        placeholder="Confirm password"
                                        className={`w-full p-4 rounded-lg border outline-none text-gray-800 font-semibold transition-all bg-white ${errors.confirm ? "border-red-500" : "border-gray-300 focus:border-red-600 shadow-sm"}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
                                    >
                                        {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                                {errors.confirm && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.confirm}</p>}
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-white border border-gray-200 p-6 rounded-xl mb-8">
                            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-4">
                                Password Requirements
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {[
                                    { key: "length", label: "Min 8 Characters" },
                                    { key: "upper", label: "Uppercase Letter" },
                                    { key: "number", label: "Include Number" },
                                    { key: "special", label: "Special Character" }
                                ].map((req) => (
                                    <div key={req.key} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${checkRequirement(req.key) ? "text-green-600" : "text-gray-400"}`}>
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border ${checkRequirement(req.key) ? "bg-green-600 border-green-600 text-white" : "border-gray-300"}`}>
                                            {checkRequirement(req.key) ? "✓" : ""}
                                        </div>
                                        {req.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-black transition-all shadow-sm"
                            >
                                Change Password
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="sm:w-32 bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition-all shadow-sm"
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudChangePass;