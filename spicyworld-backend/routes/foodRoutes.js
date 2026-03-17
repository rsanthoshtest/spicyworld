const express = require('express');
const router = express.Router();
const { getAllFood, seedFood } = require('../controllers/foodController');

router.get('/', getAllFood);
router.post('/seed', seedFood);

module.exports = router;
