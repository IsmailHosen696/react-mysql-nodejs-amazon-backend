const express = require('express');
const { signup, signin, admin } = require('../controllers/authcontroller');
const { verifyToken } = require('../middleware/authtoken');
const authroute = express.Router();

authroute.post('/signin', signin);
authroute.post('/signup', signup);
authroute.get('/admin/user/all', verifyToken, admin);

module.exports = authroute;