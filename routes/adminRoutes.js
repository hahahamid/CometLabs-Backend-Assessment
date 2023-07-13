const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addQuestion', authMiddleware, adminController.addQuestion);
router.post('/editQuestion', authMiddleware, adminController.editQuestion);
router.post('/deleteQuestion', authMiddleware, adminController.deleteQuestion);

module.exports = router;
