import React from "react";
import {Box} from "@material-ui/core";
import {BadgeAvatar, ChatContent} from "../Sidebar";
import {makeStyles} from "@material-ui/core/styles";
import {setActiveChat} from "../../store/activeConversation";
import {connect} from "react-redux";

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
  const {setActiveChat, conversation} = props;

  const handleClick = () => {
    setActiveChat(conversation.otherUser.username);
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
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
