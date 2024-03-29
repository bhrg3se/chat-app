import React from "react";
import {Avatar, Badge, Box} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";

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
}));


type UserAvatarProps = {
  sidebar: boolean;
  username: string;
  photoUrl: string;
  online: boolean;
}
const UserAvatar = (props: UserAvatarProps) => {

    const classes = useStyles(),
        {sidebar, username, photoUrl, online} = props;

    return (
        <Box className={sidebar
            ? classes.sidebar
            : ""}>
            <Badge
                classes={{"badge": `${classes.badge} ${online && classes.online}`}}
                variant="dot"
                anchorOrigin={{"horizontal": "right",
                    "vertical": "bottom"}}
                overlap="circle">
                <Avatar alt={username} src={photoUrl} className={classes.profilePic}></Avatar>
            </Badge>
        </Box>
    );

};

export default UserAvatar;
