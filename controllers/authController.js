// controllers/authController.js

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate an access token
        const accessToken = jwt.sign({ username: user.username, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1 days' });

        res.json({ user, accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function logoutUser(req, res) {
    // You may want to handle logout logic here if needed

    // For simplicity, just send a success message
    res.json({ message: 'Logout successful' });
}

module.exports = { loginUser, logoutUser };
