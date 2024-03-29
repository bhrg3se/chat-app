const router = require('express').Router();
const {Op} = require('sequelize');
const {User, Conversation, Message} = require('../../db/models');
const onlineUsers = require('../../onlineUsers');

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    let conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ['id'],
      order: [[Message, 'createdAt', 'ASC']],
      include: [
        {model: Message, order: ['createdAt', 'DESC']},
        {
          model: User,
          as: 'user1',
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ['id', 'username', 'photoUrl'],
          required: false,
        },
        {
          model: User,
          as: 'user2',
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ['id', 'username', 'photoUrl'],
          required: false,
        },
      ],
    });

    conversations = addExtraFields(conversations, onlineUsers);

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

const addExtraFields = (conversations, onlineUsers) => conversations.map((convo) => {
  const convoJSON = convo.toJSON();

  // set a property "otherUser" so that frontend will have easier access
  if (convoJSON.user1) {
    convoJSON.otherUser = convoJSON.user1;
    delete convoJSON.user1;
  } else if (convoJSON.user2) {
    convoJSON.otherUser = convoJSON.user2;
    delete convoJSON.user2;
  }

  // set property for online status of the other user
  convoJSON.otherUser.online = !!onlineUsers[convoJSON.otherUser.id];

  // set properties for notification count and latest message preview
  convoJSON.latestMessageText = convoJSON?.messages?.[convoJSON.messages?.length - 1]?.text;

  // set unread messages count
  convoJSON.unreadMsgs = convoJSON.messages.filter((msg) => !msg.seen && msg.senderId === convoJSON.otherUser.id).length;
  return convoJSON;
});

module.exports = {
  router,
  addExtraFields,
};
