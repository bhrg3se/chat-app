import React from "react";
import {
    Avatar, Badge, Box, Menu, MenuItem
} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {logout} from "../../store/utils/thunkCreators";
import {clearOnLogout} from "../../store";

const useStyles = makeStyles(() => ({
        "profilePic": {
            "height": 44,
            "width": 44
        },
        "badge": {
            "height": 13,
            "width": 13,
            "borderRadius": "50%",
            "border": "2px solid white",
            "backgroundColor": "#D0DAE9"
        },
        "online": {
            "backgroundColor": "#1CED84"
        },
        "sidebar": {
            "marginLeft": 17
        }
    })),

    UserAvatar = (props) => {

        const classes = useStyles(),
            {
                sidebar, username, photoUrl, online
            } = props,
            handleLogout = async () => {

                await props.logout(props.user.id);

            },

            [
                anchorEl,
                setAnchorEl
            ] = React.useState(null),
            openMenu = (event) => {

                setAnchorEl(event.target);

            },
            closeMenu = (event) => {

                setAnchorEl(null);

            };

        return (
            <Box className={sidebar
                ? classes.sidebar
                : ""}>
                <Badge
                    classes={{"badge": `${classes.badge} ${online && classes.online}`}}
                    variant="dot"
                    anchorOrigin={{"horizontal": "right",
                        "vertical": "bottom"}}
                    overlap="circle"
                >
                    <Avatar
                        alt={username}
                        src={photoUrl}
                        className={classes.profilePic}
                        onClick={openMenu}
                        onMouseOver={console.log}
                    />
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        onClose={closeMenu}
                        open={Boolean(anchorEl)}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>

                </Badge>
            </Box>
        );

    },

    mapDispatchToProps = (dispatch) => ({
        "logout": (id) => {

            dispatch(logout(id));
            dispatch(clearOnLogout());

        }
    }),

    mapStateToProps = (state) => ({
        "user": state.user
    });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAvatar);
