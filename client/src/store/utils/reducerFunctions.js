export const addMessageToStore = (state, payload) => {
  const {
    message,
    sender,
    incrementNewMessage,
    activeConversationId,
  } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      newMessagesCount: 1,
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }
  
  let activeConversationIndex = null;

  const newState = state.map((convo, index) => {
    if (convo.id === message.conversationId) {
      const newConvo = {
        ...convo
      };

      if(incrementNewMessage) {
        if(activeConversationId) {
          if(message.conversationId !== activeConversationId) {
            newConvo.newMessagesCount += 1;
          }
        } else {
          newConvo.newMessagesCount += 1;
        }
      }
      
      activeConversationIndex = index;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });

  if (activeConversationIndex) {
    const moveForwardCoversation = newState.splice(activeConversationIndex, 1)[0];
    newState.unshift(moveForwardCoversation);
  }

  return newState;
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = {
        ...convo
      };
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
      const convoCopy = {
        ...convo
      };
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
      let fakeConvo = {
        otherUser: user,
        messages: []
      };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  let activeConversationIndex = null;
  const newState = state.map((convo, index) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = {
        ...convo
      };
      activeConversationIndex = index;
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });

  if (activeConversationIndex) {
    const moveForwardCoversation = newState.splice(activeConversationIndex, 1)[0];
    newState.unshift(moveForwardCoversation);
  }
  return newState;
};


export const setReadMessagesToStore = (state, payload) => {
  const { conversationId, senderId } = payload;
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const newConvo = {
        ...convo
      };
      if(newConvo.otherUser.id === senderId) {
        newConvo.newMessagesCount = 0;
      }
      for(let i = newConvo.messages.length - 1; i >= 0; i--) {
        if (newConvo.messages[i].senderId === senderId) {
          if(newConvo.messages[i].read === true) break;
          newConvo.messages[i].read = true;
        }
      }
      return newConvo;
    }
    return convo;
  })
}