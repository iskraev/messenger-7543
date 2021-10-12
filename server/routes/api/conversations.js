const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op, Sequelize } = require("sequelize");
const onlineUsers = require("../../onlineUsers");
const GroupChat = require('../../db/models/groupChat');

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
          '$groupChat.userId$': userId
        }, 
      },
      attributes: ["id", "name", [Sequelize.literal(`(
        SELECT COUNT(DISTINCT messages)
        FROM messages
        INNER JOIN conversations ON conversations.id = "messages"."conversationId"
        WHERE "messages"."senderId" != ${userId}
        AND "messages"."conversationId" = conversation.id
        AND messages.read = false
      )`), 'newMessagesCount']], 
      group: ["conversation.id", "messages.id", "user1.id", "user2.id", "groupChat.id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: GroupChat, as: 'groupChat' },
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });
    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      if(convoJSON.name) {
        conversations[i] = convoJSON;
        continue;
      };
      
      if(convoJSON.userId) continue;

      convoJSON.newMessagesCount = parseInt(convoJSON.newMessagesCount);

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;
      convoJSON.messages = convoJSON.messages.reverse();

      convoJSON.lastReadIndex = undefined;

      // find last read index
      for(let i = convoJSON.messages.length - 1; i >= 0; i--) {
        if(convoJSON.messages[i].senderId === userId) {
          if(convoJSON.messages[i].read === true) {
            convoJSON.lastReadIndex = i;
            break;
          };
        }
      }

      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
