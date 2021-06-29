import axios from "axios";
import socket from "../../socket";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  markMessagesAsSeen,
} from "../conversations";
import { gotUser, setFetchingStatus } from "../user";
import { conversationCompareFunc } from "./sortutil";
import { setActiveChat } from "../activeConversation";

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get("/auth/user");
    dispatch(gotUser(data));
    if (data.id) {
      socket.emit("go-online", data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/register", credentials);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete("/auth/logout");
    dispatch(gotUser({}));
    socket.emit("logout", id);
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    const sorted = await data.sort(conversationCompareFunc)
    dispatch(gotConversations(sorted));
  } catch (error) {
    console.error(error);
  }
};

export const viewChat = (convoId, senderId) => async (dispatch) => {
  dispatch(setActiveChat(convoId));
  try {
    await axios.patch("/api/seen", {
      id: convoId
    });
    dispatch(markMessagesAsSeen(convoId, senderId));
  } catch (error) {
    console.error(error);
  }
};


const saveMessage = async (body) => {
  const { data } = await axios.post("/api/messages", body);
  return data;
};

const sendMessage = (data, body) => {
  socket.emit("new-message", {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
  });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body, isNewConvo) => async (dispatch) => {
// message format to send: {recipientId, text}
export const postMessage = (body) => async (dispatch) => {
  try {
    const data = await saveMessage(body);

    if (isNewConvo) {
      // dispatch(addConversation(body.recipientId, {
      //   id: Date.now(),
      //   senderId: body.senderId,
      //   text: body.text
      // }));    } else {
      // dispatch(setNewMessage(body.text));
    }
    socket.emit("new-message", {
      text: body.text,
      recipientId: body.recipientId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};
