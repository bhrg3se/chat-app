export const addMessageToStore = (state, payload) => {
  const {message, sender} = payload;

  // if sender is null, that means the message needs to be appended in a existing convo and move the convo to the top
  if (sender === null) {
    let convos = [...state]
    let i = state.findIndex(convo => convo.id === message.conversationId)
    const convo = {...convos[i]}
    if (!convo) {
      return convos
    }
    convo.messages.push(message);
    convo.latestMessageText = message.text;

    //bring the convo to the top of the chat list
    convos.splice(i, 1)
    return [convo, ...convos]
  }

  // if sender isn't null, that means the message needs to be put in a brand new convo
  const newConvo = {
    id: message.conversationId,
    otherUser: sender,
    messages: [message],
  };
  newConvo.latestMessageText = message.text;
  return [newConvo, ...state];

};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const markAsSeen = (state, convoID, senderId) => {
  return state.map((convo) => {
    if (convo.id === convoID) {
      const newConvo = {...convo};
      newConvo.messages = convo.messages.map(message => {
        //mark only received messages as seen
        //senderId from param is the id of current user
        if (message.senderId !== senderId) {
          message.seen = true;
        }
        return message
      })
      newConvo.unreadMsgs = 0
      return newConvo
    } else {
      return convo
    }
  });
};
