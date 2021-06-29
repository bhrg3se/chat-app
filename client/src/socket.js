import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  addConversation
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    // console.log(data)
    // if( data.sender!==null ){
    //   store.dispatch(addConversation(data.recipientId, {
    //     id: Date.now(),
    //     senderId: data.sender.id,
    //     text: data.text
    //   }));
    // }
    store.dispatch(setNewMessage(data.message, data.sender));
  });
});

export default socket;
