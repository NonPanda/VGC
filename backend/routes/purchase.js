const express = require('express');
const { createPurchase, getPurchasedGames } = require('../controllers/purchaseController');
const router = express.Router();

router.post('/', createPurchase);
router.get('/', getPurchasedGames);

module.exports = router;
