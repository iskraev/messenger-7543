const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const GroupChat = require('./groupChat');

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Conversation.hasMany(GroupChat, { as: 'groupChat' });

module.exports = {
  User,
  Conversation,
  Message
};
