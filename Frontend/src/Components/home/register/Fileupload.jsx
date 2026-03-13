// components/common/FileUpload.jsx
// The dashed-border upload area used in both forms.
// Props mirror the original inline markup exactly — no visual changes.

const FileUpload = ({
  name,
  accept,
  label,
  hint,
  subHint,
  buttonLabel = "Choose File",
  selectedFile,
  onChange,
  error,
  multiple = false,
}) => (
  <div>
    {label && (
      <label className="text-sm text-gray-600">
        {label}
      </label>
    )}
    {hint && <p className="text-xs text-gray-400 mt-0.5 mb-1">{hint}</p>}

    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
      <p className="text-sm text-gray-500 mb-1">
        {subHint ?? "Click to upload or drag and drop"}
      </p>
      {accept && (
        <p className="text-xs text-gray-400 mb-3">
          {accept === ".pdf" ? "Only PDF format allowed" : "JPG / PNG format allowed"}
        </p>
      )}
      <label className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded cursor-pointer">
        {buttonLabel}
        <input
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={onChange}
        />
      </label>
      {selectedFile && (
        <p className="text-xs text-green-600 mt-2">✓ {selectedFile.name ?? selectedFile}</p>
      )}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FileUpload;