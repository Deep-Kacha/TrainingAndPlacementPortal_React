const InputField = ({ label, type = "text", placeholder, value, onChange, readOnly }) => {
  return (
    <div className="mb-4">

      <label className="block text-sm text-gray-600 mb-1">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-none ${readOnly ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "focus:ring-2 focus:ring-red-400"}`}
      />

    </div>
  );
};

export default InputField;