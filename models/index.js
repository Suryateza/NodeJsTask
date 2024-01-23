// models/index.js
const User = require('./User');
const Group = require('./Group');
const Message = require('./Message');

// User.belongsToMany(Group, { through: 'UserGroup' });
// Group.belongsToMany(User, { through: 'UserGroup' });
// Message.belongsTo(User, { through: 'UserGroup' });
