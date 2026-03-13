// components/student/AddressSection.jsx
// Section 4 of StudentRegistration — current address, permanent address, city, state, pincode.

import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const AddressSection = ({ formData, errors, handleChange }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
      <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">4</span>
      </div>
      <h3 className="font-semibold text-gray-800">Address</h3>
    </div>

    <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField label="Current Address" required error={errors.currentAddress}>
        <input name="currentAddress" placeholder="Enter current address" className={INPUT_STYLE} value={formData.currentAddress} onChange={handleChange} />
      </FormField>

      <FormField label="Permanent Address" required error={errors.permanentAddress}>
        <input name="permanentAddress" placeholder="Enter permanent address" className={INPUT_STYLE} value={formData.permanentAddress} onChange={handleChange} />
      </FormField>

      <FormField label="City" required error={errors.city}>
        <input name="city" placeholder="Enter city" className={INPUT_STYLE} value={formData.city} onChange={handleChange} />
      </FormField>

      <FormField label="State" required error={errors.state}>
        <input name="state" placeholder="Enter state" className={INPUT_STYLE} value={formData.state} onChange={handleChange} />
      </FormField>

      <FormField label="Pincode" required error={errors.pincode}>
        <input name="pincode" placeholder="6-digit pincode" className={INPUT_STYLE} value={formData.pincode} onChange={handleChange} />
      </FormField>
    </div>
  </div>
);

export default AddressSection;