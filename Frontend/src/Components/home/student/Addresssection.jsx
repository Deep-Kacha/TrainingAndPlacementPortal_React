// components/student/AddressSection.jsx
// Section 4 of StudentRegistration — current address, permanent address, city, state, pincode.

import SectionCard from "../register/SectionCard";
import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const AddressSection = ({ formData, errors, handleChange }) => (
  <SectionCard number="4" title="Address" contentClassName="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
  </SectionCard>
);

export default AddressSection;