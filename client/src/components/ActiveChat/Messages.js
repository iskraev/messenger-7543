import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const findLastRead = (messages, userId) => {
  for(let i = messages.length - 1; i >= 0; i--) {
    if(messages[i].senderId === userId) {
      if(messages[i].read === true) {
        return i;
      };
    }
  }
  return null;
}

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const lastReadIndex = findLastRead(messages, userId);

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble 
            key={message.id}
            text={message.text}
            time={time} otherUser={otherUser}
            showAvatar={index === lastReadIndex}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
