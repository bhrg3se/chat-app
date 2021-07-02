import React from 'react';
import {
  Box, Badge, Avatar, MenuItem, Menu,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { logout } from '../../store/utils/thunkCreators';
import { clearOnLogout } from '../../store';

const useStyles = makeStyles(() => ({
  profilePic: {
    height: 44,
    width: 44,
  },
  badge: {
    height: 13,
    width: 13,
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: '#D0DAE9',
  },
  online: {
    backgroundColor: '#1CED84',
  },
  sidebar: {
    marginLeft: 17,
  },
}));

const UserAvatar = (props) => {
  const classes = useStyles();
  const {
    sidebar, username, photoUrl, online,
  } = props;
  const handleLogout = async () => {
    await props.logout(props.user.id);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = (event) => {
    setAnchorEl(event.target);
  };
  const closeMenu = (event) => {
    setAnchorEl(null);
  };

  return (
    <Box className={sidebar ? classes.sidebar : ''}>
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
};

const mapDispatchToProps = (dispatch) => ({
  logout: (id) => {
    dispatch(logout(id));
    dispatch(clearOnLogout());
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAvatar);
