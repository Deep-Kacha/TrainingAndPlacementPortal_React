const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust path if needed

async function seedUsers() {
    try {
        const salt = await bcrypt.genSalt(10);
        
        // Admin Profile
        const adminEmail = 'admin@rku.ac.in';
        const adminPass = await bcrypt.hash('Admin@123', salt);
        await User.findOneAndUpdate(
            { email: adminEmail },
            { email: adminEmail, password: adminPass, role: 'admin' },
            { upsert: true, new: true }
        );

        // Student Profile
        const studentEmail = 'student@rku.ac.in';
        const studentPass = await bcrypt.hash('Student@123', salt);
        await User.findOneAndUpdate(
            { email: studentEmail },
            { email: studentEmail, password: studentPass, role: 'student' },
            { upsert: true, new: true }
        );

        console.log('Credentials seeded successfully.');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
}

module.exports = seedUsers;