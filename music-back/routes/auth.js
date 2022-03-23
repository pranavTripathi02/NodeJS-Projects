const express = require('express');
const router = express.Router();

const { login, register, logout } = require('../controllers/auth');
const { authoriseUser } = require('../middleware/Authorization');

router.post('/login', login);
router.delete('/logout', authoriseUser, logout);
router.post('/register', register);

module.exports = router;
