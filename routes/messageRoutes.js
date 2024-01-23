// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { sendGroupMessage, likeMessage } = require('../controllers/messageController');

router.use(authenticateToken);
router.post('/:groupId', sendGroupMessage);
router.post('/:messageId/like', likeMessage);

module.exports = router;
