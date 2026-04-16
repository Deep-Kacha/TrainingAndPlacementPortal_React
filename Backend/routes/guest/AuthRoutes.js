const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { registerStudent, login } = require('../../controllers/guest/AuthController');
const { createGuestOrder } = require('../../controllers/Student/PaymentController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Too many attempts. Please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/register', authLimiter, upload.fields([{ name: 'consentForm', maxCount: 1 }, { name: 'paymentProof', maxCount: 1 }]), registerStudent);
router.post('/login', authLimiter, login);
router.post('/payment/create-order', createGuestOrder);

module.exports = router;
