const express = require('express');
const router = express.Router();

const { registerStudent, login } = require('../../controllers/guest/AuthController');
const { forgotPassword } = require('../../controllers/Auth/PasswordController');
const { createGuestOrder } = require('../../controllers/Student/PaymentController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(req.user ? req.user.id : Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/register', upload.fields([{ name: 'consentForm', maxCount: 1 }, { name: 'paymentProof', maxCount: 1 }]), registerStudent);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/payment/create-order', createGuestOrder);

module.exports = router;
