// controllers/adminController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createAdmin(req, res) {
    const { username, password, isAdmin } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            return res.status(200).json({ error: 'User already exist!' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            isAdmin: true,
        });

        res.json(newUser);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e?.message || 'Internal Server Error' });
    }
}

async function createUser(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            return res.status(200).json({ error: 'User already exist!' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            isAdmin: false,
        });

        res.json(newUser);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e?.message || 'Internal Server Error' });
    }
}

async function editUser(req, res) {
    const { userId } = req.params;
    const { username, password } = req.body;

    try {
        // Find the user by ID
        const user = await User.findByPk(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user details
        user.username = username || user.username;
        user.password = password ? await bcrypt.hash(password, 10) : user.password;

        // Save the changes
        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createAdmin, createUser, editUser };
