import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  setReadMessages,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import { updateMessagesReadStatus } from './store/utils/thunkCreators';

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("update-new-messages", (data) => {
    const { conversationId, senderId } = data;
    store.dispatch(setReadMessages({ conversationId, senderId }));
  });

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
 
  socket.on("new-message", async (data) => {
    const { conversationId } = store.getState().activeConversation;
    if(conversationId) {
      if(data.message.conversationId === conversationId) {
        await store.dispatch(updateMessagesReadStatus(conversationId, data.message.senderId))
        data.message.read = true;
      }
    }
    
    store.dispatch(setNewMessage(data.message, data.sender, true, conversationId));
  });
});

export default socket;
