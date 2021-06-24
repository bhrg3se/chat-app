const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (convoId) => {
  return {
    type: SET_ACTIVE_CHAT,
    convoId
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return action.convoId;
    }
    default:
      return state;
  }
};

export default reducer;
