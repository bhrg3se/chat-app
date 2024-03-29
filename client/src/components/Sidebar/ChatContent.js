import React from "react";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
        "root": {
            "display": "flex",
            "justifyContent": "space-between",
            "marginLeft": 20,
            "flexGrow": 1
        },
        "username": {
            "fontWeight": "bold",
            "letterSpacing": -0.2
        },
        "previewText": {
            "fontSize": 12,
            "color": "#9CADC8",
            "letterSpacing": -0.17
        },
        "previewTextUnread": {
            "fontSize": 13,
            "color": "#000000",
            "letterSpacing": -0.17,
            "fontWeight": "bold"
        },
        "badge": {
            "display": "inline-block",
            "minWidth": "10px",
            "padding": "3px 7px",
            "fontSize": "12px",
            "fontWeight": 700,
            "lineHeight": 1,
            "color": "#fff",
            "textAlign": "center",
            "whiteSpace": "nowrap",
            "verticalAlign": "middle",
            "backgroundColor": "#3F92FF",
            "borderRadius": "10px"
        },

        "notification": {
            "height": 20,
            "width": 20,
            "backgroundColor": "#3F92FF",
            "marginRight": 10,
            "color": "white",
            "fontSize": 10,
            "letterSpacing": -0.5,
            "fontWeight": "bold",
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "borderRadius": 10
        }
    })),

    ChatContent = (props) => {

        const classes = useStyles(),

            {conversation} = props,
            {latestMessageText, otherUser} = conversation;

        return (
            <Box className={classes.root}>
                <Box>
                    <Typography className={classes.username}>
                        {otherUser.username}
                    </Typography>
                    <Typography className={conversation.unreadMsgs
                        ? classes.previewTextUnread
                        : classes.previewText}>
                        {latestMessageText}
                    </Typography>
                </Box>
                {Boolean(conversation.unreadMsgs) &&
        <Box>
            <div className={classes.badge}>{conversation.unreadMsgs}</div>
        </Box>
                }
            </Box>
        );

    };

export default ChatContent;
