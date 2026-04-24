// components/company/EligibilitySection.jsx
// Section 4 of CompanyRegister — eligible batches and courses (checkboxes).

import SectionCard from "../register/SectionCard";
import { BATCHES,COURSES } from "../register/Placementdata";

const EligibilitySection = ({ formData, handleCheckbox, handleChange }) => (
  <SectionCard number="4" title="Eligibility Criteria" contentClassName="px-6 py-5 space-y-5">
    {/* Min CGPA */}
    <div className="mb-4">
      <label className="text-sm text-gray-600 block mb-2">Minimum CGPA Required (Optional)</label>
      <input
        type="number"
        step="0.01"
        min="0"
        max="10"
        name="minCgpa"
        placeholder="e.g. 7.50 (Leave 0 for no minimum)"
        className="w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-red-300 text-sm"
        value={formData.minCgpa || ""}
        onChange={handleChange}
      />
    </div>

    {/* Batches */}
    <div>
      <p className="text-sm text-gray-600 mb-2">Eligible Batch</p>
      <div className="flex flex-wrap gap-4">
        {BATCHES.map((batch) => (
          <label key={batch} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className="accent-red-600"
              checked={formData.eligibleBatches.includes(batch)}
              onChange={() => handleCheckbox("eligibleBatches", batch)}
            />
            {batch}
          </label>
        ))}
      </div>
    </div>

    {/* Courses */}
    <div>
      <p className="text-sm text-gray-600 mb-2">Eligible Courses</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {COURSES.map((course) => (
          <label key={course} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className="accent-red-600"
              checked={formData.eligibleCourses.includes(course)}
              onChange={() => handleCheckbox("eligibleCourses", course)}
            />
            {course}
          </label>
        ))}
      </div>
    </div>
  </SectionCard>
);

export default EligibilitySection;