const express = require('express');
const testCaseController = require('../controllers/testCaseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addTestcase', authMiddleware, testCaseController.addTestCase);

module.exports = router;
