import React from 'react';

const Interview_schedule = () => {

    const interviews = [
        {
            id: 1,
            company: "TCS",
            role: "Software Developer",
            date: "March 18, 2024",
            time: "11:00 AM - 12:00 PM",
            type: "Online Interview",
            typeIcon: "video",
            location: "Zoom",
            locationIcon: "link",
            round: "Final Round",
            status: "Pending",
            statusColor: "red"
        },
        {
            id: 2,
            company: "Infosys",
            role: "Software Developer",
            date: "March 10, 2024",
            time: "2:00 PM - 3:30 PM",
            type: "Offline Interview",
            typeIcon: "building",
            location: "College Auditorium",
            locationIcon: "pin",
            round: "HR Round",
            status: "Completed",
            statusColor: "green"
        },
        {
            id: 3,
            company: "Wipro",
            role: "Software Developer",
            date: "March 15, 2024",
            time: "10:00 AM - 11:30 AM",
            type: "Online Interview",
            typeIcon: "video",
            location: "Microsoft Teams",
            locationIcon: "link",
            round: "Technical Round",
            status: "Completed",
            statusColor: "green"
        },
        {
            id: 4,
            company: "Accenture",
            role: "Software Developer",
            date: "March 8, 2024",
            time: "3:00 PM - 4:00 PM",
            type: "Offline Interview",
            typeIcon: "building",
            location: "Conference Room A",
            locationIcon: "pin",
            round: "Technical Round",
            status: "Completed",
            statusColor: "green"
        }
    ];

    const icons = {
        calendar: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
        clock: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
        video: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>,
        building: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>,
        link: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>,
        pin: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
        layer: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <h1 className="page-title">Interview Schedule</h1>
                <p className="page-subtitle">View your upcoming and completed interview details.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {interviews.map((item) => (
                    <div key={item.id} className="card-basic p-6 relative flex flex-col pb-20 md:pb-6">

                        {/* Header Section */}
                        <div className="flex flex-row items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-2xl shrink-0">
                                {item.company.charAt(0)}
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="m-0 text-xl font-bold text-gray-900">{item.company}</h3>
                                <p className="m-0 text-gray-700 text-sm font-medium">{item.role}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 text-gray-600 text-sm font-medium mb-16 md:mb-12">
                            <div className="flex items-center gap-3">
                                {icons.calendar} {item.date}
                            </div>
                            <div className="flex items-center gap-3">
                                {icons.clock} {item.time}
                            </div>
                            <div className="flex items-center gap-3">
                                {icons[item.typeIcon]} {item.type}
                            </div>
                            <div className="flex items-center gap-3">
                                {icons[item.locationIcon]} {item.location}
                            </div>
                            <div className="flex items-center gap-3 md:col-span-2">
                                {icons.layer} {item.round}
                            </div>
                        </div>

                        {/* Status Button */}
                        <div className="absolute bottom-6 right-6 mt-auto flex justify-end inset-x-auto">
                            <span className={`px-4 py-2 rounded text-white font-bold text-sm tracking-wide inline-block shadow-sm ${item.statusColor === 'red' ? 'bg-red-700' : 'bg-green-700'}`}>
                                {item.status}
                            </span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
export default Interview_schedule;