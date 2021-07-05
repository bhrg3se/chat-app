import React from "react";
import {Redirect, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {
    Button,
    Grid,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {login} from "../../store/utils/thunkCreators";
import AuthPageWrapper from "../AuthPageWrapper";
import {LoginForm} from "./form";

const useStyles = makeStyles(() => ({
        "form": {
            "alignItems": "flex-end",
            "alignSelf": "flex-end",
            "alignContent": "flex-end"
        },
        "label": {
            "color": "#a9a9a9"
        },
        "shadowButton": {
            "boxShadow": "0 8px 16px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.19)"
        }
    })),

    Login = (props) => {

        const classes = useStyles(),
            history = useHistory(),
            {user, login} = props,

            handleLogin = async (event) => {

                event.preventDefault();
                const username = event.target.username.value,
                    password = event.target.password.value;

                await login({username,
                    password});

            };

        if (user.id) {

            return <Redirect to="/home" />;

        }

        return (
            <AuthPageWrapper>
                <Grid container item direction="row" xs={9} alignItems="center" justify="flex-end">
                    <Grid item xs={5}>
                        <Typography className={classes.label} variant="subtitle1">Don&apos;t have an account?</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Button
                            className={classes.shadowButton}
                            size="large"
                            onClick={() => history.push("/register")}
                            variant="text"
                        >
                            <Typography variant="subtitle1" color="primary">Create account</Typography>
                        </Button>
                    </Grid>
                </Grid>

                <Grid xs={9} item container direction="row" alignContent="center">
                    <Grid>
                        <Typography variant="h4">
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

    },

    mapStateToProps = (state) => ({
        "user": state.user
    }),

    mapDispatchToProps = (dispatch) => ({
        "login": (credentials) => {

            dispatch(login(credentials));

        }
    });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
