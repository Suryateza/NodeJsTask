// models/Group.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Group = sequelize.define('Group', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    members: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Group;

