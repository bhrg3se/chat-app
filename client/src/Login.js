import React from "react";
import {Redirect, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import {login} from "./store/utils/thunkCreators";
import AuthPageWrapper from "./AuthPageWrapper";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  form: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
    alignContent: "flex-end"

  },
  label: {
    color: "#a9a9a9"
  },
  shadowButton: {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.19)"
  },
  textField: {
    width: "50vw"
  },
}));


const Login = (props) => {
  const classes = useStyles()
  const history = useHistory();
  const {user, login} = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({username, password});
  };

  if (user.id) {
    return <Redirect to="/home"/>;
  }

  return (
      <AuthPageWrapper>
        <Grid container item direction={"row"} xs={9} alignItems={"center"} justify={"flex-end"}>
          <Grid item xs={5}>
            <Typography className={classes.label} variant={"h7"}>Don't have an account?</Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
                className={classes.shadowButton}
                size={"large"}
                onClick={() => history.push("/register")}
                variant="raised"
            >
              <Typography variant={"h7"} color={"primary"}>Create account</Typography>
            </Button>
          </Grid>
        </Grid>


        <Grid xs={9} item container direction={"row"} alignContent={"center"}>
          <Grid>
            <Typography variant={"h4"}>
              Welcome back!
            </Typography>

          </Grid>
          <Grid item className={classes.form}>
            <LoginForm
                handleLogin={handleLogin}
            />
          </Grid>
        </Grid>

      </AuthPageWrapper>

  );
};

const LoginForm = (props) => {
  const classes = useStyles();
  const {handleLogin} = props;

  return (
      <form onSubmit={handleLogin}>
        <Grid>
          <Grid>
            <FormControl margin="normal" required>
              <TextField
                  className={classes.textField}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
              />
            </FormControl>
          </Grid>
          <FormControl margin="normal" required>
            <TextField
                className={classes.textField}
                label="password"
                aria-label="password"
                type="password"
                name="password"
            />
          </FormControl>
          <Grid item alignItems={"center"} container direction={"row"}>
            <Grid item xs={4}/>
            <Grid item xs={4} alignItems={"center"}>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  color={"primary"}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={4}/>
          </Grid>
        </Grid>
      </form>

  )
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
