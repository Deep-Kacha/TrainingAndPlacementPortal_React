import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const statusCards = [
        { title: 'T&P Status', status: 'APPROVED', detail: 'Registration Approved', colorClass: 'text-green-700 bg-[#e8f5e9]', icon: '✅' },
        { title: 'Applied', status: '3', detail: 'Job Applications', colorClass: 'text-[#2980b9] bg-blue-100', icon: '💼' },
        { title: 'Interviews', status: '2', detail: 'Scheduled', colorClass: 'text-[#d35400] bg-orange-100', icon: '🗓️' }
    ];

    const quickActions = [
        { title: 'Browse Jobs', desc: 'Explore available opportunities', linkText: 'View Jobs', onclick: () => navigate("/student/jobs"), icon: '🔍' },
        { title: 'My Applied', desc: 'Track application status', linkText: 'View Applied', onclick: () => navigate("/student/applications"), icon: '📋' },
        { title: 'Profile', desc: 'Update your information', linkText: 'Edit Profile', onclick: () => navigate("/student/profile"), icon: '👤' },
        { title: 'Interviews', desc: 'Manage interview schedule', linkText: 'View Schedule', onclick: () => navigate("/student/interview_schedule"), icon: '🗓️' }
    ];

    return (
        <div className="w-full">
            <header className="page-header flex justify-between items-start">
                <div>
                    <h1 className="page-title">Welcome Bhavesh - 2023CS001</h1>
                    <p className="page-subtitle">Here's your placement dashboard overview</p>
                </div>
            </header>

            {/* Status Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {statusCards.map((card, index) => (
                    <div key={index} className="card-dashboard">
                        <div className="flex justify-between items-start mb-5">
                            <div className="text-[1.5rem] p-[10px] bg-[#d8cfc3] rounded-[8px]">
                                {card.icon}
                            </div>
                            <span className={`font-bold text-[0.85rem] px-[8px] py-[4px] rounded-[4px] ${card.colorClass}`}>
                                {card.status}
                            </span>
                        </div>
                        <div>
                            <h3 className="m-0 text-[1.2rem] font-bold text-[#333]">{card.title}</h3>
                            <p className="mt-[5px] text-[0.9rem] text-text-gray m-0">{card.detail}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Quick Actions */}
            <section>
                <h2 className="text-[1.5rem] font-bold mb-[20px] text-[#333]">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {quickActions.map((action, index) => (
                        <div key={index} className="card-action" onClick={action.onclick}>
                            <div className="w-[60px] h-[60px] bg-[#e9e2d5] rounded-full flex items-center justify-center mb-[15px] text-[1.8rem]">
                                {action.icon}
                            </div>
                            <h3 className="text-lg font-bold my-[10px] text-[#333]">{action.title}</h3>
                            <p className="text-text-gray text-[0.9rem] mb-[20px] leading-snug w-full">{action.desc}</p>
                            <span className="text-[#e7000b] font-[600] text-[0.95rem] no-underline mt-auto">
                                {action.linkText} ➔
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;