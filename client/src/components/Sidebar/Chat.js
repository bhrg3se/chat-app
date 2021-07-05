import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { BadgeAvatar, ChatContent } from '.';
import { viewChat } from '../../store/utils/thunkCreators';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { viewChat, conversation, user } = props;

  const handleClick = () => {
    viewChat(conversation.id, user.id, conversation.otherUser.id);
  };

  return (
    <Box
      onClick={handleClick}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={conversation.otherUser.photoUrl}
        username={conversation.otherUser.username}
        online={conversation.otherUser.online}
        sidebar
      />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  viewChat: (convoId, senderId, otherUserId) => {
    dispatch(viewChat(convoId, senderId, otherUserId));
  },
});
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
