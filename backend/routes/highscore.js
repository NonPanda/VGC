const express = require('express');
const { saveHighscore, getHighscore } = require('../controllers/highscoreController');
const router = express.Router();

router.post('/', saveHighscore);
router.get('/', getHighscore);

module.exports = router;
