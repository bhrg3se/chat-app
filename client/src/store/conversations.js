import {
    addMessageToStore,
    addNewConvoToStore,
    addOnlineUserToStore,
    addSearchedUsersToStore,
    markAsSeen, removeOfflineUserFromStore
} from "./utils/reducerFunctions";

// ACTIONS

const ADD_CONVERSATION = "ADD_CONVERSATION",
    ADD_ONLINE_USER = "ADD_ONLINE_USER",
    CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS",
    GET_CONVERSATIONS = "GET_CONVERSATIONS",
    MARK_AS_SEEN = "MARK_AS_SEEN",
    REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER",
    SET_MESSAGE = "SET_MESSAGE",
    SET_SEARCHED_USERS = "SET_SEARCHED_USERS";

// ACTION CREATORS

export const gotConversations = (conversations) => ({
    "type": GET_CONVERSATIONS,
    conversations
});

export const setNewMessage = (message, sender) => ({
    "type": SET_MESSAGE,
    "payload": {message,
        "sender": sender || null}
});

export const addOnlineUser = (id) => ({
    "type": ADD_ONLINE_USER,
    id
});

export const removeOfflineUser = (id) => ({
    "type": REMOVE_OFFLINE_USER,
    id
});

export const setSearchedUsers = (users) => ({
    "type": SET_SEARCHED_USERS,
    users
});

export const clearSearchedUsers = () => ({
    "type": CLEAR_SEARCHED_USERS
});

// Add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => ({
    "type": ADD_CONVERSATION,
    "payload": {recipientId,
        newMessage}
});

// Mark all messages as seen in a conversation
export const markMessagesAsSeen = (convoId, senderId) => ({
    "type": MARK_AS_SEEN,
    "payload": {convoId,
        senderId}
});

// REDUCER

const reducer = (state = [], action) => {

    switch (action.type) {

    case GET_CONVERSATIONS:
        return action.conversations;
    case SET_MESSAGE:
        return addMessageToStore(
            state,
            action.payload
        );
    case ADD_ONLINE_USER: {

        return addOnlineUserToStore(
            state,
            action.id
        );

    }
    case REMOVE_OFFLINE_USER: {

        return removeOfflineUserFromStore(
            state,
            action.id
        );

    }
    case SET_SEARCHED_USERS:
        return addSearchedUsersToStore(
            state,
            action.users
        );
    case CLEAR_SEARCHED_USERS:
        return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
        return addNewConvoToStore(
            state,
            action.payload.recipientId,
            action.payload.newMessage
        );
    case MARK_AS_SEEN:
        return markAsSeen(
            state,
            action.payload.convoId,
            action.payload.senderId
        );
    default:
        return state;

    }

};

export default reducer;
