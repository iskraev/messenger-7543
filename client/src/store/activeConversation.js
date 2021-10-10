import {
  ADD_CONVERSATION
} from './conversations';
const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (payload) => {
  return {
    type: SET_ACTIVE_CHAT,
    payload
  };
};

const reducer = (state = {
  username: null,
  conversationId: null
}, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return action.payload;
    }
    case ADD_CONVERSATION: {
      const newState = {
        ...state
      };
      newState.conversationId = action.payload.newMessage.conversationId;
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;