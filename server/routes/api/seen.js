const router = require("express").Router();
const { Message } = require("../../db/models");
const { Op } = require("sequelize");

// mark all messages in a conversations as read (seen)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const convoID = parseInt(req.body.id);

    //TODO check if the user belong in this conversation

    await Message.update({
      seen: true
    },{
      where: {
        conversationId: convoID,
        [Op.not]:{
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
