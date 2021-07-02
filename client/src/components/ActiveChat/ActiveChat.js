import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import {connect} from 'react-redux';
import {Input, Header, Messages} from './index';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
    height: '100%',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    overflowY: 'auto',
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
              username={conversation.otherUser.username}
              online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
                messages={conversation.messages}
                otherUser={conversation.otherUser}
                userId={user.id}
            />
          </Box>
          <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
          />
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  conversation:
      state.conversations
      && state.conversations.find(
      (conversation) => {
        if (conversation.id) {
          return conversation.id === state.activeConversation.convoId;
        }
        return conversation.otherUser.id === state.activeConversation.otherUserId;
      },
      ),
});

export default connect(mapStateToProps, null)(ActiveChat);
