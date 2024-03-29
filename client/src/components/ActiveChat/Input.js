import React, {useState} from "react";
import {FilledInput, FormControl} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {postMessage} from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
        "root": {
            "justifySelf": "flex-end",
            "marginTop": 15
        },
        "input": {
            "height": 70,
            "backgroundColor": "#F4F6FA",
            "borderRadius": 8,
            "marginBottom": 20
        }
    })),

    Input = (props) => {

        const classes = useStyles(),
            [
                text,
                setText
            ] = useState(""),

            handleChange = (event) => {

                setText(event.target.value);

            },

            handleSubmit = async (event) => {

                event.preventDefault();
                if (!event.target.text.value) {

                    return;

                }
                // Add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
                const reqBody = {
                    "text": event.target.text.value,
                    "recipientId": props.otherUser.id
                };
                await props.postMessage(
                    reqBody,
                    !props.conversationId
                );
                setText("");

            };

        return (
            <form className={classes.root} onSubmit={handleSubmit}>
                <FormControl fullWidth hiddenLabel>
                    <FilledInput
                        className={classes.input}
                        disableUnderline
                        placeholder="Type something..."
                        value={text}
                        name="text"
                        onChange={handleChange}
                    />
                </FormControl>
            </form>
        );

    },

    mapStateToProps = (state) => ({
        "user": state.user,
        "conversations": state.conversations
    }),

    mapDispatchToProps = (dispatch) => ({
        "postMessage": (message, isNewConvo) => {

            dispatch(postMessage(
                message,
                isNewConvo
            ));

        }
    });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Input);
