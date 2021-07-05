import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Button, CssBaseline, Grid} from "@material-ui/core";
import {SidebarContainer} from "./Sidebar";
import {ActiveChat} from "./ActiveChat";
import {fetchConversations, logout} from "../store/utils/thunkCreators";
import {clearOnLogout} from "../store/index";

const useStyles = makeStyles(() => ({
        "root": {
            "height": "97vh"
        }
    })),

    Home = (props) => {

        const classes = useStyles(),
            [
                isLoggedIn,
                setIsLoggedIn
            ] = useState(false);

        useEffect(
            () => {

                props.fetchConversations();

            },
            []
        );

        useEffect(
            () => {

                setIsLoggedIn(true);

            },
            [props.user.id]
        );

        if (!props.user.id) {

            // If we were previously logged in, redirect to login instead of register
            if (isLoggedIn) {

                return <Redirect to="/login" />;

            }
            return <Redirect to="/register" />;

        }
        return (
            <>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <SidebarContainer />
                    <ActiveChat />
                </Grid>
            </>
        );

    },

    mapStateToProps = (state) => ({
        "user": state.user,
        "conversations": state.conversations
    }),

    mapDispatchToProps = (dispatch) => ({
        "fetchConversations": () => {

            dispatch(fetchConversations());

        }
    });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
