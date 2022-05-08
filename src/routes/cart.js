const express = require('express');
const cartController = require('../controllers/cart');

const router = express.Router();

router.post('/post', cartController.dbWrite2);

module.exports = router;
