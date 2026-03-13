import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudJobs = () => {
    const navigate = useNavigate();
    // Mock data for jobs based on the image
    const [jobs, setJobs] = useState([
        { id: 1, company: "TCS", role: "Software Development Engineer", salary: "₹8.0 LPA", location: "Pune, Maharashtra", cgpa: "7.5", status: "Apply" },
        { id: 2, company: "Infosys", role: "Systems Engineer", salary: "₹6.5 LPA", location: "Bangalore, Karnataka", cgpa: "7.0", status: "Applied" },
        { id: 3, company: "Wipro", role: "Project Engineer", salary: "₹7.0 LPA", location: "Hyderabad, Telangana", cgpa: "6.5", status: "Applied" },
        { id: 4, company: "HCL Technologies", role: "Software Engineer", salary: "₹8.5 LPA", location: "Noida, Uttar Pradesh", cgpa: "7.0", status: "Apply" },
        { id: 5, company: "Tech Mahindra", role: "Software Developer", salary: "₹6.0 LPA", location: "Pune, Maharashtra", cgpa: "6.0", status: "Apply" },
        { id: 6, company: "Larsen & Toubro", role: "Embedded Engineer", salary: "₹9.0 LPA", location: "Chennai, Tamil Nadu", cgpa: "7.5", status: "Applied" }
    ]);

    const handleApply = (id) => {
        setJobs(jobs.map(job =>
            job.id === id ? { ...job, status: 'Applied' } : job
        ));
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <h1 className="page-title">Companies for Apply</h1>
                <p className="page-subtitle">Here you can Apply for Interviews</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map(job => (
                    <div className="card-basic flex flex-col" key={job.id}>
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl shrink-0">
                                {job.company.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold m-0 mb-1 text-gray-900">{job.company}</h2>
                                <p className="text-gray-600 text-sm font-medium m-0">{job.role}</p>
                            </div>
                        </div>

                        <div className="text-primary-red text-2xl font-bold mb-4">
                            {job.salary}
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                                <span className="text-base">📍</span>
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">
                                <span className="text-base">✅</span>
                                <span>CGPA ≥ {job.cgpa} ✔</span>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button 
                                className="btn-outline flex-1"
                                onClick={() => navigate('/student/jobs/details', { state: { job } })}
                            >
                                View Details
                            </button>
                            {job.status === 'Applied' ? (
                                <button className="btn-disabled flex-1" disabled>
                                    Applied
                                </button>
                            ) : (
                                <button
                                    className="btn-primary flex-1"
                                    onClick={() => handleApply(job.id)}
                                >
                                    Apply
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudJobs;
