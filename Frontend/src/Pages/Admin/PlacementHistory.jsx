import PlacementRow from "../../Components/Admin/PlacementHistory/PlacementRow";

const AdminPlacementHistory = () => {

  const placements = [
    {
      id:1,
      company:"Multiicon",
      role:"PHP Developer",
      package:"₹3.6 LPA",
      offerDate:"Jan 12, 2026",
      joiningDate:"July 12, 2026",
      selected: 5,
      status:"completed",
      statusLabel:"Completed"
    },
    {
      id:2,
      company:"Gateway Group",
      role:"Software Engineer",
      package:"₹4.5 LPA",
      offerDate:"-",
      joiningDate:"-",
      selected: 0,
      status:"scheduled",
      statusLabel:"Interview Scheduled"
    },
    {
      id:3,
      company:"Infinity IT",
      role:"React Native Developer",
      package:"₹5 LPA",
      offerDate:"-",
      joiningDate:"-",
      selected: 0,
      status:"hold",
      statusLabel:"On Hold"
    },
    {
      id:4,
      company:"TCS Ltd",
      role:"Software Development Engineer",
      package:"₹8 LPA",
      offerDate:"-",
      joiningDate:"-",
      selected: 12,
      status:"applied",
      statusLabel:"Applied"
    },
    {
      id:5,
      company:"Simform",
      role:"DotNet Developer",
      package:"₹5.5 LPA",
      offerDate:"-",
      joiningDate:"-",
      selected: 0,
      status:"rejected",
      statusLabel:"Rejected"
    },
    {
      id:6,
      company:"TatvaSoft",
      role:"Java Developer",
      package:"₹6.5 LPA",
      offerDate:"Feb 20, 2026",
      joiningDate:"Aug 01, 2026",
      selected: 3,
      status:"approved",
      statusLabel:"Approved"
    },
    {
      id:7,
      company:"Radixweb",
      role:"QA Engineer",
      package:"₹4.8 LPA",
      offerDate:"-",
      joiningDate:"-",
      selected: 0,
      status:"progress",
      statusLabel:"In Progress"
    },
    {
      id:8,
      company:"Wipro",
      role:"System Analyst",
      package:"₹6 LPA",
      offerDate:"-",
      joiningDate:"-",
      selected: 0,
      status:"applied",
      statusLabel:"Applied"
    },
    {
      id:9,
      company:"Capgemini",
      role:"Project Engineer",
      package:"₹4 LPA",
      offerDate:"Mar 15, 2026",
      joiningDate:"Sep 01, 2026",
      selected: 8,
      status:"completed",
      statusLabel:"Completed"
    },
    {
      id:10,
      company:"Tech Mahindra",
      role:"Analyst",
      package:"₹3.8 LPA",
      offerDate:"-",
      joiningDate:"-",
      selected: 0,
      status:"scheduled",
      statusLabel:"Interview Scheduled"
    },
    {
      id:11,
      company:"HCL Tech",
      role:"Graduate Engineer Trainee",
      package:"₹4.25 LPA",
      offerDate:"-",
      joiningDate:"-",
      selected: 0,
      status:"hold",
      statusLabel:"On Hold"
    },
    {
      id:12,
      company:"Accenture",
      role:"Software Associate",
      package:"₹4.5 LPA",
      offerDate:"-",
      joiningDate:"-",
      selected: 0,
      status:"rejected",
      statusLabel:"Rejected"
    }
  ];

  return (
    <div className="w-full">

        {/* Header */}
        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-red-600">
            Placement History
          </h1>

          <p className="text-gray-600 text-sm md:text-base">
            Manage And maintain A Placement Records
          </p>

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left min-w-[900px]">

            <thead className="bg-gray-200">

              <tr>
                <th className="p-4">Company Name</th>
                <th className="p-4">Job Role</th>
                <th className="p-4">Package</th>
                <th className="p-4 text-center">Selected Students</th>
                <th className="p-4">Offer Date</th>
                <th className="p-4">Joining Date</th>
                <th className="p-4">Status</th>
              </tr>

            </thead>

            <tbody>

              {placements.map((item) => (
                <PlacementRow
                  key={item.id}
                  data={item}
                />
              ))}

            </tbody>

          </table>

        </div>

    </div>
  );
};

export default AdminPlacementHistory;