// components/student/ParentInfoSection.jsx
// Section 3 of StudentRegistration — parent name, email, mobile.

import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const ParentInfoSection = ({ formData, errors, handleChange }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
      <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">3</span>
      </div>
      <h3 className="font-semibold text-gray-800">Parent / Guardian Information</h3>
    </div>

    <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField label="Parent Name" required error={errors.parentName}>
        <input name="parentName" placeholder="Enter parent name" className={INPUT_STYLE} value={formData.parentName} onChange={handleChange} />
      </FormField>

      <FormField label="Parent Email" required error={errors.parentEmail}>
        <input name="parentEmail" type="email" placeholder="Enter parent email" className={INPUT_STYLE} value={formData.parentEmail} onChange={handleChange} />
      </FormField>

      <FormField label="Parent Mobile Number" required error={errors.parentMobile}>
        <input name="parentMobile" type="tel" placeholder="10-digit mobile number" className={INPUT_STYLE} value={formData.parentMobile} onChange={handleChange} />
      </FormField>
    </div>
  </div>
);

export default ParentInfoSection;