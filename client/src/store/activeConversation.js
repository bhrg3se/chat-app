const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (convoId, otherUserId) => ({
    "type": SET_ACTIVE_CHAT,
    "payload": {
        convoId,
        otherUserId
    }
});

const reducer = (state = "", action) => {

    switch (action.type) {

    case SET_ACTIVE_CHAT: {

        return action.payload;

    }
    default:
        return state;

    }

};

export default reducer;
