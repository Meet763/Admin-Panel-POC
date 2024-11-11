const express = require('express');
const userLogin = require('../controller/adminController/login');

const router = express.Router();

router.post('/login', userLogin)

module.exports = router;