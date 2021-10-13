const router = require("express").Router();
const { Conversation } = require("../../db/models");
const GroupChat = require('../../db/models/userConversations');

router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;

    const { name } = req.body;

    if(!name) {
      return res.sendStatus(422);
    }
    
    const conversation = await Conversation.create({
      name
    });

    await GroupChat.create({
      conversationId: conversation.id,
      userId
    });

    res.status(200).send('Group Chat has been created.');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
