const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const {getSocket} = require("../../socket");

// expects {recipientId, text } in body
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const {recipientId, text} = req.body;
    let sender = null;


    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
        senderId,
        recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
      sender = req.user
      //since the sender just sent a message they must be online
      sender.online = true;

    }
    const message = await Message.create({
      senderId,
      text,
      seen: false,
      conversationId: conversation.id,
    });


    //send message to all online sockets of recipient user
    if (onlineUsers[recipientId]) {
      onlineUsers[recipientId].forEach(socketId => {
        sendMessage(socketId, message, sender)
      })
    }

    //send message to all online sockets of sender user
    if (onlineUsers[senderId]) {
      onlineUsers[senderId].forEach(socketId => {
        sendMessage(socketId, message, sender)
      })
    }


    res.json({message, sender});
  } catch (error) {
    next(error);
  }
});

const sendMessage = (socketId, message, sender) => {
  const socket = getSocket();
  socket.to(socketId).emit("new-message", {
    message: message,
    sender: sender,
  });

}

module.exports = router;
