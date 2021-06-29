const router = require("express").Router();
const {Message, Conversation} = require("../../db/models");
const {Op} = require("sequelize");

// mark all messages in a conversations as read (seen)
router.patch("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const convoID = parseInt(req.body.id);

    console.log(convoID)
    console.log(typeof convoID)
    console.log(typeof req.body.id)

    //check if the user belongs to this conversation
    const check = await Conversation.userBelongsTo(userId, convoID)
    if (!check) {
      return res.sendStatus(401);
    }

    await Message.update({
      seen: true
    }, {
      where: {
        conversationId: convoID,
        [Op.not]: {
          senderId: userId
        }
      }
    })

    res.status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
