import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudForgotPassword = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value, allData) => {
        let error = "";
        if (name === "email") {
            if (!value) error = "Email is required.";
            else if (!/^[^\s@]+@rku\.ac\.in$/.test(value)) error = "Only @rku.ac.in email addresses are allowed.";
        } else if (name === "newPassword") {
            if (!value) error = "New password is required.";
            else if (value.length < 8) error = "Must be at least 8 characters.";
            else if (!/[A-Z]/.test(value)) error = "Must contain an uppercase letter.";
            else if (!/[a-z]/.test(value)) error = "Must contain a lowercase letter.";
            else if (!/\d/.test(value)) error = "Must contain a number.";
            else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = "Must contain a special character.";
        } else if (name === "confirmPassword") {
            if (!value) error = "Confirm password is required.";
            else if (value !== allData.newPassword) error = "Passwords do not match.";
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);

        const error = validateField(name, value, updatedData);
        setErrors((prev) => ({ ...prev, [name]: error }));

        if (name === "newPassword" && updatedData.confirmPassword) {
            const confirmError = validateField("confirmPassword", updatedData.confirmPassword, updatedData);
            setErrors((prev) => ({ ...prev, [name]: error, confirmPassword: confirmError }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailErr = validateField("email", formData.email, formData);
        const newErr = validateField("newPassword", formData.newPassword, formData);
        const confirmErr = validateField("confirmPassword", formData.confirmPassword, formData);

        setErrors({
            email: emailErr,
            newPassword: newErr,
            confirmPassword: confirmErr
        });

        if (!emailErr && !newErr && !confirmErr && formData.email && formData.newPassword && formData.confirmPassword) {
            alert("Password successfully verified and updated!");
            setFormData({ email: "", newPassword: "", confirmPassword: "" });
            navigate("/Authentication/login"); // assuming navigating to home or login page after successful password reset
        }
    };

    const checkRequirement = (type) => {
        const val = formData.newPassword;
        switch (type) {
            case "length": return val.length >= 8;
            case "upper": return /[A-Z]/.test(val);
            case "lower": return /[a-z]/.test(val);
            case "number": return /\d/.test(val);
            case "special": return /[!@#$%^&*(),.?":{}|<>]/.test(val);
            default: return false;
        }
    };

    return (
        <div className="w-full">

            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
                Recover Account
            </h1>
            <p className="text-gray-600 mb-8">
                Update your password to regain access to your placement portal.
            </p>

            {/* Form */}
            <div className="flex justify-center">
                <div className="w-full max-w-xl bg-[#d8cfc3] p-8 md:p-10 rounded-xl border border-gray-200 shadow-sm">
                    {/* Email */}
                    <div className="mb-6">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                            Registered Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your college email"
                                className={`w-full p-4 pl-10 rounded-lg border outline-none text-gray-800 font-semibold transition-all bg-white ${errors.email ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
                            />
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.email && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* New Password */}
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    className={`w-full p-4 rounded-lg border outline-none text-gray-800 font-semibold transition-all bg-white ${errors.newPassword ? "border-red-500" : "border-gray-300 focus:border-red-600 shadow-sm"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.newPassword && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.newPassword}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter password"
                                    className={`w-full p-4 rounded-lg border outline-none text-gray-800 font-semibold transition-all bg-white ${errors.confirmPassword ? "border-red-500" : "border-gray-300 focus:border-red-600 shadow-sm"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    {/* Password Rules */}
                    <div className="bg-white border border-gray-200 p-6 rounded-xl mb-8">
                        <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-4">
                            Security Guidelines
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {[
                                { key: "length", label: "Min 8 Characters" },
                                { key: "upper", label: "Upper & Lower" },
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
                            onClick={handleSubmit}
                            className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-black transition-all shadow-sm"
                        >
                            Update Password
                        </button>
                        <button
                            onClick={() => navigate("/Authentication/login")}
                            className="sm:w-32 bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition-all shadow-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudForgotPassword;