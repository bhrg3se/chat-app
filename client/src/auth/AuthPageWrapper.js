import React from 'react';

import {
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import BGImage from '../assets/bg-img.png';
import SVGBUbble from '../assets/bubble.svg';

const useStyles = makeStyles(() => ({
  leftPortion: {
    backgroundImage: `url(${BGImage})`,
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vh',

  },
  blueLayer: {
    backgroundImage: 'linear-gradient(rgba(70,146,252,0.9),rgba(70,146,252,0.2))',
    width: '100%',
    height: '100%',
  },
  bubble: {
    color: 'blue',
  },
  text: {
    color: 'white',
  },
}));

const AuthPageWrapper = (props) => {
  const classes = useStyles();

  return (
    <Grid justify="center" container spacing={0} direction="row">
      <Hidden xsDown>
        <Grid key={1} xs={4} item className={classes.leftPortion}>
          <Grid
            className={classes.blueLayer}
            container
            direction="row"
            alignContent="center"
          >
            <Grid item xs={12} align="center">
              <img alt="Hello" className={classes.bubble} src={SVGBUbble} />
            </Grid>
            <Grid item xs={12} align="center">
              <Typography
                className={classes.text}
                variant="h4"
              >
                Converse with anyone
                {' '}
                <br />
                with any language
              </Typography>
            </Grid>
          </Grid>

        </Grid>
      </Hidden>

      <Grid
        key={2}
        xs={8}
        item
        container
        direction="column"
        alignContent="center"
        wrap="nowrap"
        alignItems="center"
      >
        {props.children}

      </Grid>

    </Grid>

  );
};

export default AuthPageWrapper;
