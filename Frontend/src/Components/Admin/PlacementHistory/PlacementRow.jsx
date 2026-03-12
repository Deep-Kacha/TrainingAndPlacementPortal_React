    import { FaBuilding } from "react-icons/fa";

const PlacementRow = ({ data }) => {

  const statusColors = {
    completed: "bg-green-100 text-green-700",
    scheduled: "bg-blue-100 text-blue-700",
    hold: "bg-indigo-100 text-indigo-700",
    applied: "bg-blue-100 text-blue-600",
    rejected: "bg-red-100 text-red-600",
    approved: "bg-blue-100 text-blue-700",
    progress: "bg-indigo-100 text-indigo-600"
  };

  return (
    <tr className="bg-white border-t hover:bg-gray-50">

      {/* Company */}
      <td className="p-4 flex items-center gap-3 font-semibold">

        <div className="bg-blue-200 text-blue-700 w-10 h-10 flex items-center justify-center rounded-lg">
          <FaBuilding />
        </div>

        {data.company}

      </td>

      {/* Role */}
      <td className="p-4">{data.role}</td>

      {/* Package */}
      <td className="p-4 font-semibold">{data.package}</td>

      {/* Selected Students */}
      <td className="p-4 text-center font-semibold text-gray-700">{data.selected}</td>

      {/* Offer Date */}
      <td className="p-4">{data.offerDate}</td>

      {/* Joining */}
      <td className="p-4">{data.joiningDate}</td>

      {/* Status */}
      <td className="p-4">

        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[data.status]}`}>
          {data.statusLabel}
        </span>

      </td>

    </tr>
  );
};

export default PlacementRow;