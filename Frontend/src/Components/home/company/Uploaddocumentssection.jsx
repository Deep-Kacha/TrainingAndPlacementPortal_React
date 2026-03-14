// components/company/UploadDocumentsSection.jsx
// Section 7 of CompanyRegister — multi-file upload area.

import SectionCard from "../register/SectionCard";

const UploadDocumentsSection = () => (
  <SectionCard number="7" title="Upload Documents" contentClassName="px-6 py-5">
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
      <p className="text-sm text-gray-500 mb-1">Drop files here or click to browse</p>
      <p className="text-xs text-gray-400 mb-4">Upload up to 10 files, Max 10MB each</p>
      <label className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded cursor-pointer">
        Choose Files
        <input type="file" multiple className="hidden" />
      </label>
    </div>
  </SectionCard>
);

export default UploadDocumentsSection;