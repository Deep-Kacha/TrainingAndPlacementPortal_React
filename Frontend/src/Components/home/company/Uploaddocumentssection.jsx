// components/company/UploadDocumentsSection.jsx
// Section 7 of CompanyRegister — file upload area.

import SectionCard from "../register/SectionCard";

const UploadDocumentsSection = ({ file, handleFileChange }) => (
  <SectionCard number="7" title="Upload Job Document" contentClassName="px-6 py-5">
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 flex flex-col items-center">
      <p className="text-sm text-gray-500 mb-1">
        {file ? `Selected: ${file.name}` : "Drop your JD file here or click to browse"}
      </p>
      <p className="text-xs text-gray-400 mb-4">Upload a single file, Max 10MB (PDF, DOCX)</p>
      <label className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded cursor-pointer">
        Choose File
        <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
      </label>
    </div>
  </SectionCard>
);

export default UploadDocumentsSection;