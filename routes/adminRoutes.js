// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { createAdmin, createUser, editUser } = require('../controllers/adminController');

// router.use(authenticateToken);
router.post('/users/createAdmin', createAdmin );
router.post('/users', authenticateToken, createUser);
router.put('/users/:userId', authenticateToken, editUser);

module.exports = router;
