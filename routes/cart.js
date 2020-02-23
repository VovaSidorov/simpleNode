const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.get('/:userId',cartsController.cart_list);
router.post('/:userId/:productId',cartsController.add_to_cart);

module.exports = router;
