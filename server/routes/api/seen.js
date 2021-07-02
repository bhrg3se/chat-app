const router = require('express').Router();
const {Op} = require('sequelize');
const {Message, Conversation} = require('../../db/models');

// mark all messages in a conversations as read (seen)
router.patch('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const convoID = parseInt(req.body.id);

    if (!convoID) {
      return res.sendStatus(400);
    }

    // check if the user belongs to this conversation
    const check = await Conversation.userBelongsTo(userId, convoID);
    if (!check) {
      return res.sendStatus(403);
    }

    await Message.update({
      seen: true,
    }, {
      where: {
        conversationId: convoID,
        [Op.not]: {
          senderId: userId,
        },
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
