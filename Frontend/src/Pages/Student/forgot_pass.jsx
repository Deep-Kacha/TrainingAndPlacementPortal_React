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

            {/* Header */}
            <header className="page-header flex justify-between items-start mb-8">
                <div>
                    <h1 className="page-title text-[#e7000b] text-[2rem] font-bold m-0 mb-2">Forgot Password</h1>
                    <p className="page-subtitle text-[#666] text-base m-0">Update your password to recover your account.</p>
                </div>
            </header>

            {/* Form */}
            <div className="flex justify-center">

                <div className="bg-[#ece6da] border-[1.5px] border-[#e7000b] p-6 md:p-8 rounded-[12px] shadow-sm w-full max-w-lg">

                    {/* Email */}
                    <div className="mb-5">

                        <label className="block text-sm font-semibold text-[#333] mb-2">
                            Registered Email Address
                        </label>

                        <div className="relative">

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your college email"
                                className={`w-full p-3 bg-white rounded-lg pl-10 border outline-none text-[#333] ${errors.email ? "border-red-500" : "border-[#e0d8cc] focus:border-[#e7000b]"}`}
                            />

                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

                    </div>


                    {/* New Password */}
                    <div className="mb-5">

                        <label className="block text-sm font-semibold text-[#333] mb-2">
                            New Password
                        </label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className={`w-full p-3 bg-white rounded-lg border outline-none text-[#333] ${errors.newPassword ? "border-red-500" : "border-[#e0d8cc] focus:border-[#e7000b]"}`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>
                        {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}

                    </div>


                    {/* Confirm Password */}
                    <div className="mb-5">

                        <label className="block text-sm font-semibold text-[#333] mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter new password"
                                className={`w-full p-3 bg-white rounded-lg border outline-none text-[#333] ${errors.confirmPassword ? "border-red-500" : "border-[#e0d8cc] focus:border-[#e7000b]"}`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}

                    </div>


                    {/* Password Rules */}
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


                    {/* Confirm Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#e7000b] text-white py-3 rounded-lg mb-3 font-bold uppercase transition-all hover:bg-red-700 border-none cursor-pointer"
                    >
                        Update Password
                    </button>


                    {/* Cancel Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-transparent border border-gray-400 text-[#333] py-3 rounded-lg font-bold uppercase transition-all hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
};

export default StudForgotPassword;