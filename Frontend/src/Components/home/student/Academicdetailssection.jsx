// components/student/AcademicDetailsSection.jsx
// Section 2 of StudentRegistration — 10th, 12th, CGPA, backlogs.

import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const AcademicDetailsSection = ({ formData, errors, handleChange }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
      <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">2</span>
      </div>
      <h3 className="font-semibold text-gray-800">Academic Details</h3>
    </div>

    <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField label="10th Percentage" required error={errors.tenth}>
        <input name="tenth" type="number" placeholder="e.g. 85.50" className={INPUT_STYLE} value={formData.tenth} onChange={handleChange} />
      </FormField>

      <FormField label="12th Percentage" required error={errors.twelfth}>
        <input name="twelfth" type="number" placeholder="e.g. 82.00" className={INPUT_STYLE} value={formData.twelfth} onChange={handleChange} />
      </FormField>

      <FormField label="Current CGPA" required error={errors.cgpa}>
        <input name="cgpa" type="number" placeholder="e.g. 7.50" className={INPUT_STYLE} value={formData.cgpa} onChange={handleChange} />
      </FormField>

      <FormField label="Active Backlogs (if any)">
        <input name="backlogs" type="number" placeholder="0" className={INPUT_STYLE} value={formData.backlogs} onChange={handleChange} />
      </FormField>
    </div>
  </div>
);

export default AcademicDetailsSection;