const {Conversation, Message} = require("../db/models");
const onlineUsers = require("../onlineUsers");

// expects {recipientId, text } in body
const sendMessage = async (socket, data) => {
  try {
    if (!socket.user) {
      return socket.diconnect();
    }
    const senderId = socket.user.id;
    const {recipientId, text} = data;

    let sender = null;

    // find a conversation to make sure it doesn't already exist
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
      sender = socket.user;
      if (onlineUsers[sender.id]) {
        sender.online = true;
      }
    }

    //save message in database
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });

    socket.emit("new-message", {
      message: message,
      sender: sender,
    });

    //send message to all online sockets of recipient user
    if (onlineUsers[recipientId]) {
      onlineUsers[recipientId].forEach(socketId => {
        socket.to(socketId).emit("new-message", {
          message: message,
          sender: sender,
        });
      })
    }

  } catch (error) {
    console.error(error);
  }
}


module.exports = {sendMessage};
