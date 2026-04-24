const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: "No token provided." });
    
    // Expecting: Bearer <token>
    const tokenPart = token.split(' ')[1];
    if (!tokenPart) return res.status(403).json({ error: "Malformed token." });

    jwt.verify(tokenPart, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !process.env.JWT_SECRET) return res.status(401).json({ error: "Unauthorized! Invalid signature." });
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (req.userRole !== role) {
            return res.status(403).json({ error: `Access denied. Requires ${role} role!` });
        }
        next();
    };
};

module.exports = { verifyToken, requireRole };
