const express = require('express');
const router = express.Router();
const { registerStudent, login } = require('../../controllers/guest/AuthController');

router.post('/register', registerStudent);
router.post('/login', login);

module.exports = router;
