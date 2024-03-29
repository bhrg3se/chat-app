import React from "react";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {BadgeAvatar} from "./index";

const useStyles = makeStyles(() => ({
        "root": {
            "height": 44,
            "marginTop": 23,
            "marginLeft": 6,
            "display": "flex",
            "alignItems": "center"
        },
        "subContainer": {
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center",
            "flexGrow": 1
        },
        "username": {
            "letterSpacing": -0.23,
            "fontSize": 16,
            "fontWeight": "bold",
            "marginLeft": 17
        },
        "ellipsis": {
            "color": "#95A7C4",
            "marginRight": 24,
            "opacity": 0.5
        }
    })),

    CurrentUser = (props) => {

        const classes = useStyles(),

            user = props.user || {};

        return (
            <Box className={classes.root}>
                <BadgeAvatar photoUrl={user.photoUrl} online />
                <Box className={classes.subContainer}>
                    <Typography className={classes.username}>{user.username}</Typography>
                    <MoreHorizIcon classes={{"root": classes.ellipsis}} />
                </Box>
            </Box>
        );

    },

    mapStateToProps = (state) => ({
        "user": state.user
    });

export default connect(mapStateToProps)(CurrentUser);
