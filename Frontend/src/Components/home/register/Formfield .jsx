// components/common/FormField.jsx
// A generic wrapper for label + input/select/textarea + error message.
// Zero UI changes — just removes the repeated pattern from every section.

const FormField = ({ label, required, error, children }) => (
  <div>
    {label && (
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FormField;