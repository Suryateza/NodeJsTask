// routes/groupRoutes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { createGroup, deleteGroup, searchGroups, addMembers } = require('../controllers/groupController');

router.use(authenticateToken);
router.post('', createGroup);
router.delete('/:groupId', deleteGroup);
router.get('', searchGroups);
router.post('/:groupId/members', addMembers);

module.exports = router;
