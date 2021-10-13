const Sequelize = require("sequelize");
const db = require("../db");

const UserConversations = db.define("userConversations", {
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = UserConversations;
