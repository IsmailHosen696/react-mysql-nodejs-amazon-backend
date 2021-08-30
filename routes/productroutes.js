const express = require('express');
const router = express.Router();
const db = require('mysql');
const { getallproducts, addproducts } = require('../controllers/product');

router.get('/allproducts', getallproducts);
router.post('/add/products', addproducts);

module.exports = router;