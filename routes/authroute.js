const express = require('express');
const { signup, signin, admin, home } = require('../controllers/authcontroller');
const { verifyToken } = require('../middleware/authtoken');
const authroute = express.Router();

authroute.post('/signin', signin);
authroute.post('/signup', signup);
authroute.get('/admin/user/all', verifyToken, admin);
authroute.get('/', verifyToken, home)
module.exports = authroute;