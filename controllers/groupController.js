// controllers/groupController.js

const Group = require('../models/Group');
const User = require('../models/User');

async function createGroup(req, res) {
    const { name } = req.body;

    try {
        // Create a new group
        const newGroup = await Group.create({
            name,
        });

        res.json(newGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteGroup(req, res) {
    const { groupId } = req.params;

    try {
        // Find the group by ID
        const group = await Group.findByPk(groupId);

        // Check if the group exists
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Delete the group
        await group.destroy();

        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function searchGroups(req, res) {
    try {
        // Find all groups
        const groups = await Group.findAll();

        res.json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function addMembers(req, res) {
    const { groupId } = req.params;
    const { userIds } = req.body;

    try {
        // Find the group by ID
        const group = await Group.findByPk(groupId);

        // Check if the group exists
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Find users by IDs
        const users = await User.findAll({ where: { id: userIds } });

        // Check if all users exist
        if (users.length !== userIds.length) {
            return res.status(404).json({ error: 'One or more users not found' });
        }

        let members = group.members ? group.members.split(',') : [];
        // Remove duplicates
        members = [...new Set([...members.map(e => parseFloat(e)), ...userIds])];

        group.members = members.join(',');

        // Add users to the group
        await group.save();

        res.json({ message: 'Members added to the group successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createGroup, deleteGroup, searchGroups, addMembers };
