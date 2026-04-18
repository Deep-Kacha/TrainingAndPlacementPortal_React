import React, { useState } from 'react';
import axios from 'axios';

const SubmitJD = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        requirements: '',
        ctc: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });
        
        try {
            // Adjust to your actual API endpoint
            await axios.post('http://localhost:5000/api/jd/submit', formData); 
            setStatus({ type: 'success', message: 'JD Submitted Successfully!' });
            setFormData({ companyName: '', role: '', requirements: '', ctc: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to submit JD. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submit Job Description</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input 
                        type="text"
                        name="companyName" 
                        value={formData.companyName} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g. Google, Microsoft" 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                    <input 
                        type="text"
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g. Software Engineer" 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                    <textarea 
                        name="requirements" 
                        value={formData.requirements} 
                        onChange={handleChange} 
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Required skills, experience, etc." 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTC Details</label>
                    <input 
                        type="text"
                        name="ctc" 
                        value={formData.ctc} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g. 10 LPA" 
                        required 
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Submitting...' : 'Submit Job Description'}
                </button>
                
                {status.message && (
                    <div className={`p-3 rounded-md text-sm font-medium text-center ${status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                        {status.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SubmitJD;