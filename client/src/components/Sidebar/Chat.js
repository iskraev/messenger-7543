import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { updateMessagesReadStatus } from '../../store/utils/thunkCreators.js';
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import ReadStatus from './ReadStatus';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, updateMessagesStatus } = props;
  const { newMessagesCount } = conversation;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await updateMessagesStatus(conversation.id, conversation.otherUser.id);
    await props.setActiveChat({
      username: conversation.otherUser.username, 
      conversationId: conversation.id
    });
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} newMessage={newMessagesCount > 0} />
      {newMessagesCount > 0 && <ReadStatus count={newMessagesCount} />}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (payload) => {
      dispatch(setActiveChat(payload));
    },
    updateMessagesStatus: async (conversationId, senderId) => {
      dispatch(updateMessagesReadStatus(conversationId, senderId))
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
