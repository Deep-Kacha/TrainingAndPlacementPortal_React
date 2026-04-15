const express = require('express');
const router = express.Router();
const { submitJd } = require('../../controllers/guest/SubmitJd');

router.post('/submit-jd', submitJd);

module.exports = router;
