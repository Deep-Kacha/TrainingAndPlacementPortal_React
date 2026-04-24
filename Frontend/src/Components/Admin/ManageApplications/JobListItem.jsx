import { FaChevronRight } from "react-icons/fa";
import { getAvatarColor } from "../../../utils/ui";

/**
 * A single row/item in the approved-jobs left panel.
 * Props:
 *  - job          {object}   job data ({ jobPostingId, companyName, jobRole, applicationCount })
 *  - isSelected   {boolean}  whether this job is currently selected
 *  - onSelect     {fn}       called with the job object when clicked
 */
const JobListItem = ({ job, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(job)}
      className={`p-5 cursor-pointer hover:bg-gray-50 transition-all group ${
        isSelected ? "bg-red-50 border-r-4 border-red-500" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`${getAvatarColor(job.companyName)} text-white w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold flex-shrink-0 shadow-sm uppercase`}>
            {job.companyName?.charAt(0).toUpperCase() || "C"}
          </div>
          <span
            className={`font-bold text-base transition-colors truncate ${
              isSelected
                ? "text-red-600"
                : "text-gray-900 group-hover:text-red-600"
            }`}
          >
            {job.companyName}
          </span>
        </div>
        <FaChevronRight className="text-[10px] text-gray-300 group-hover:text-red-400 flex-shrink-0" />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-blue-600 uppercase">
          {job.jobRole}
        </span>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 rounded-md">
          {job.applicationCount} Applied
        </span>
      </div>
    </div>
  );
};

export default JobListItem;
