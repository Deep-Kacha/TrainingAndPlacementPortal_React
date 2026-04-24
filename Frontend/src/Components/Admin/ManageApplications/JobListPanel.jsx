import { FaBuilding, FaSpinner } from "react-icons/fa";
import JobListItem from "./JobListItem";

/**
 * Left panel: shows the list of approved jobs that have applicants.
 * Props:
 *  - jobs         {array}    list of job objects
 *  - loading      {boolean}  show spinner while fetching
 *  - selectedJob  {object}   currently selected job (used to highlight active item)
 *  - onSelect     {fn}       called with job object when an item is clicked
 */
const JobListPanel = ({ jobs, loading, selectedJob, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#c4b5a6] overflow-hidden">
      {/* Panel header */}
      <div className="p-5 border-b border-[#c4b5a6] bg-gray-50/50">
        <h2 className="text-sm font-bold text-gray-700 uppercase flex items-center gap-2">
          <FaBuilding className="text-blue-600" />
          Approved Jobs
        </h2>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
        {loading ? (
          <div className="p-10 text-center text-gray-400 font-bold uppercase text-xs flex items-center justify-center gap-2">
            <FaSpinner className="animate-spin" /> Loading...
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-10 text-center text-gray-500 font-bold uppercase text-xs">
            No jobs with applications yet.
          </div>
        ) : (
          jobs.map((job) => (
            <JobListItem
              key={job.jobPostingId}
              job={job}
              isSelected={selectedJob?.jobPostingId === job.jobPostingId}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default JobListPanel;
