import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import {register} from "./store/utils/thunkCreators";
import {makeStyles} from "@material-ui/core/styles";

import AuthPageWrapper from "./AuthPageWrapper";

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
  const {user, register} = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({username, email, password});
  };

  if (user.id) {
    return <Redirect to="/home"/>;
  }

  return (
      <AuthPageWrapper>
        <Grid container item direction={"row"} xs={9} alignItems={"center"} justify={"flex-end"}>
          <Grid item xs={5}>
            <Typography className={classes.label} variant={"h7"}>Already have an account?</Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
                className={classes.shadowButton}
                size={"large"}
                onClick={() => history.push("/login")}
                variant="raised"

            >
              <Typography variant={"h7"} color={"primary"}>Login</Typography>
            </Button>
          </Grid>
        </Grid>


        <Grid xs={9} item container direction={"row"} alignContent={"center"}>
          <Grid>
            <Typography variant={"h4"}>
              Create an account.
            </Typography>

          </Grid>
          <Grid item className={classes.form}>
            <SignupForm
                handleRegister={handleRegister}
                formErrorMessage={formErrorMessage}
            />
          </Grid>
        </Grid>

      </AuthPageWrapper>

  );
};

const SignupForm = (props) => {
  const classes = useStyles();
  const {handleRegister, formErrorMessage} = props;
  return (
      <form onSubmit={handleRegister}>
        <Grid container direction={"column"}>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                  className={classes.textField}
                  aria-label="username"
                  label="Username"
                  name="username"
                  fullWidth
                  type="text"
                  required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                  className={classes.textField}
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  fullWidth
                  name="email"
                  required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl error={!!formErrorMessage.confirmPassword}>
              <TextField
                  aria-label="password"
                  className={classes.textField}
                  label="Password"
                  type="password"
                  fullWidth
                  inputProps={{minLength: 6}}
                  name="password"
                  required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl error={!!formErrorMessage.confirmPassword}>
              <TextField
                  label="Confirm Password"
                  className={classes.textField}
                  aria-label="confirm password"
                  type="password"
                  fullWidth
                  inputProps={{minLength: 6}}
                  name="confirmPassword"
                  required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
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
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
