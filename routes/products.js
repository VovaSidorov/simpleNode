const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/',productsController.products_list);
router.get('/:productId',productsController.products_show);
router.post('/',productsController.products_new);
router.put('/:productId',productsController.products_update);
router.delete('/:productId',productsController.products_delete);

module.exports = router;