import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {viewChat} from "../../store/utils/thunkCreators";
import {setActiveChat} from "../../store/activeConversation";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const {setActiveChat, conversation,user} = props;

  const handleClick = () => {
    viewChat(conversation.id,user.id);
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
            sidebar={true}
        />
        <ChatContent conversation={conversation}/>
      </Box>
    );

}

const mapDispatchToProps = (dispatch) => {
  return {
    viewChat: (convoId, senderId) => {
      dispatch(viewChat(convoId, senderId));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
