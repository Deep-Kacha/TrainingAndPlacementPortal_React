import React from "react";
import { FaBuilding, FaCalendarAlt, FaCheckCircle, FaStar, FaPaperPlane, FaTimesCircle } from "react-icons/fa";

const Applications = () => {
    const applicationsList = [
        {
            company: "Google Inc.",
            role: "Software Engineer",
            package: "₹18 LPA",
            date: "Jan 15, 2024",
            status: "Interview Scheduled",
            iconBg: "bg-[#e1f0ff]",
            iconText: "text-[#3b82f6]",
            statusBg: "bg-[#d9dee6]",
            statusText: "text-[#314a72]",
            StatusIcon: FaCalendarAlt
        },
        {
            company: "Microsoft",
            role: "Cloud Solutions Architect",
            package: "₹22 LPA",
            date: "Jan 12, 2024",
            status: "Selected",
            iconBg: "bg-[#dcfae6]",
            iconText: "text-[#22c55e]",
            statusBg: "bg-[#ccfbe1]",
            statusText: "text-[#16a34a]",
            StatusIcon: FaCheckCircle
        },
        {
            company: "Amazon",
            role: "SDE II",
            package: "₹25 LPA",
            date: "Jan 10, 2024",
            status: "Shortlisted",
            iconBg: "bg-[#f3e8ff]",
            iconText: "text-[#a855f7]",
            statusBg: "bg-[#dbeafe]",
            statusText: "text-[#3b82f6]",
            StatusIcon: FaStar
        },
        {
            company: "Adobe Systems",
            role: "Frontend Developer",
            package: "₹16 LPA",
            date: "Jan 08, 2024",
            status: "Applied",
            iconBg: "bg-[#ffedd5]",
            iconText: "text-[#f97316]",
            statusBg: "bg-[#dbeafe]",
            statusText: "text-[#3b82f6]",
            StatusIcon: FaPaperPlane
        },
        {
            company: "Oracle",
            role: "Database Administrator",
            package: "₹14 LPA",
            date: "Jan 05, 2024",
            status: "Rejected",
            iconBg: "bg-[#fee2e2]",
            iconText: "text-[#ef4444]",
            statusBg: "bg-[#fee2e2]",
            statusText: "text-[#dc2626]",
            StatusIcon: FaTimesCircle
        },
        {
            company: "IBM",
            role: "Data Scientist",
            package: "₹20 LPA",
            date: "Jan 03, 2024",
            status: "Applied",
            iconBg: "bg-[#e0e7ff]",
            iconText: "text-[#6366f1]",
            statusBg: "bg-[#dbeafe]",
            statusText: "text-[#3b82f6]",
            StatusIcon: FaPaperPlane
        },
        {
            company: "Infosys",
            role: "System Engineer",
            package: "₹8 LPA",
            date: "Dec 28, 2023",
            status: "Shortlisted",
            iconBg: "bg-[#ccfbf1]",
            iconText: "text-[#14b8a6]",
            statusBg: "bg-[#dbeafe]",
            statusText: "text-[#3b82f6]",
            StatusIcon: FaStar
        }
    ];

    return (
        <div className="w-full">
            <header className="page-header flex justify-between items-start mb-8">
                <div>
                    <h1 className="page-title text-[#e7000b] text-[2rem] font-bold m-0 mb-2">Applied Companies List</h1>
                    <p className="page-subtitle text-[#666] text-base m-0">Here you can Apply for Interviews</p>
                </div>
            </header>

            <div className="bg-[#d8cfc3] rounded-[16px] overflow-hidden shadow-sm">
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 px-8 py-5 border-b border-[#c4bcae]/50">
                    <div className="font-bold text-[#444] text-[14px] col-span-1 pl-[60px]">Company Name</div>
                    <div className="font-bold text-[#444] text-[14px] text-center">Job Role</div>
                    <div className="font-bold text-[#444] text-[14px] text-center">Package</div>
                    <div className="font-bold text-[#444] text-[14px] text-center">Applied Date</div>
                    <div className="font-bold text-[#444] text-[14px] text-center">Status</div>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col">
                    {applicationsList.map((app, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 gap-4 px-8 py-[22px] items-center bg-[#ece6da] border-b border-[#c4bcae]/30"
                        >
                            <div className="flex items-center gap-4 col-span-1">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${app.iconBg} ${app.iconText}`}>
                                    <FaBuilding size={18} />
                                </div>
                                <span className="font-bold text-[#222] text-[15.5px] whitespace-nowrap">{app.company}</span>
                            </div>

                            <div className="text-[#555] text-[15px] text-center whitespace-nowrap">
                                {app.role}
                            </div>

                            <div className="font-[800] text-[#333] text-[15px] text-center whitespace-nowrap">
                                {app.package}
                            </div>

                            <div className="text-[#666] text-[15px] text-center whitespace-nowrap">
                                {app.date}
                            </div>

                            <div className="flex justify-center">
                                <span className={`inline-flex items-center gap-2 px-3 py-[6px] rounded-full text-[13px] font-[700] ${app.statusBg} ${app.statusText}`}>
                                    <app.StatusIcon size={11} />
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Applications;