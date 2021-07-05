import React from 'react';
import {Box} from '@material-ui/core';
import moment from 'moment';
import {SenderBubble, OtherUserBubble} from '.';

const Messages = (props) => {
    const {messages, otherUser, userId} = props;

  const showSeenAvatar = (i, message) => (i < messages.length - 2 ? false : message.seen);
  return (
      <Box>
          {messages.map((message, i) => {
              const time = moment(message.createdAt).format('h:mm');

              return message.senderId === userId ? (
                  <SenderBubble
                      key={message.id}
                      text={message.text}
                      time={time}
                      seen={showSeenAvatar(i, message)}
                      otherUserPhotoUrl={otherUser.photoUrl}
                  />
              ) : (
                  <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser}/>
              );
          })}
    </Box>
  );
};

export default Messages;
