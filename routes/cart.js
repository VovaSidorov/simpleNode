const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.get('/:userId',cartsController.cart_list);

module.exports = router;
