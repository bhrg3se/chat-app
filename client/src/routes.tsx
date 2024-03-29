import React, {useEffect, useState} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchUser} from "./store/utils/thunkCreators";
import Signup from "./auth/signup";
import Login from "./auth/login";
import {Home, SnackbarError} from "./components";
import {User} from "../types";


type RouterProps = {
  user: User,
  fetchUser: () => void
}
const Routes = (props: RouterProps) => {

        const {user, fetchUser} = props,
            [
                errorMessage,
                setErrorMessage
            ] = useState(""),
            [
                snackBarOpen,
                setSnackBarOpen
            ] = useState(false);

        useEffect(
            () => {

                fetchUser();

            },
            [fetchUser]
        );

        useEffect(
            () => {

                if (user.error) {

                    // Check to make sure error is what we expect, in case we get an unexpected server error object
                    if (typeof user.error === "string") {

                        setErrorMessage(user.error);

                    } else {

                        setErrorMessage("Internal Server Error. Please try again");

                    }
                    setSnackBarOpen(true);

                }

            },
            [user.error]
        );

        if (props.user.isFetchingUser) {

            return <div>Loading...</div>;

        }

        return (
            <>
                {snackBarOpen &&
        <SnackbarError
            setSnackBarOpen={setSnackBarOpen}
            errorMessage={errorMessage}
            snackBarOpen={snackBarOpen}
        />
                }
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Signup} />
                    <Route
                        exact
                        path="/"
                        render={(props) => (props.user?.id ? <Home /> : <Signup />)}
                    />
                    <Route path="/home" component={Home} />
                </Switch>
            </>
        );

    },

    mapStateToProps = (state) => ({
        "user": state.user
    }),

    mapDispatchToProps = (dispatch) => ({
        fetchUser () {

            dispatch(fetchUser());

        }
    });

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Routes));
