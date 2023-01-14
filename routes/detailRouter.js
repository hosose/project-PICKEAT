const express = require('express');

const detailController = require('../controllers/detailController');

const router = express.Router();

router.get('/:productId', detailController.getDetailByProductId);

module.exports = router;
