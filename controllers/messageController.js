// controllers/messageController.js

const Group = require('../models/Group');
const Message = require('../models/Message.js');
const User = require('../models/User');

async function sendGroupMessage(req, res) {
    const { groupId } = req.params;
    const { content } = req.body;
    const { username } = req.user;

    Message.sync();

    try {
        // Find the group by ID
        const group = await Group.findByPk(groupId);

        // Check if the group exists
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Create a new message
        const newMessage = await Message.create({
            content,
            groupId,
            sender: username,
        });

        res.json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function likeMessage(req, res) {
    const { messageId } = req.params;
    const { username } = req.user;

    Message.sync();

    try {
        // Find the message by ID
        const message = await Message.findByPk(messageId);

        // Check if the message exists
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        const likes = message.likes ? message.likes.split(',') : [];

        // Check if the user has already liked the message
        const hasLiked = likes.includes(username);
        if (hasLiked) {
            return res.status(400).json({ error: 'You have already liked this message' });
        }

        // Add the user to the likes array and save the changes
        likes.push(username);
        message.likes = likes.join(',');
        await message.save();

        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { sendGroupMessage, likeMessage };
