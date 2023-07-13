const express = require('express');
const solutionController = require('../controllers/solutionController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', auth ,  solutionController.submitSolution);

module.exports = router;
