const Sequelize = require("sequelize");
const db = require("../db");

const GroupChat = db.define("groupChat", {
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = GroupChat;
