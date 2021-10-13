const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConversations = require('./userConversations');

// associations

Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Conversation.belongsToMany(User, { through: UserConversations });
User.belongsToMany(Conversation, { through: UserConversations });

module.exports = {
  User,
  Conversation,
  Message
};
