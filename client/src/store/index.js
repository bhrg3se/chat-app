import {applyMiddleware, combineReducers, createStore} from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import user from "./user";
import conversations from "./conversations";
import activeConversation from "./activeConversation";

const CLEAR_ON_LOGOUT = "CLEAR_ON_LOGOUT";

export const clearOnLogout = () => ({
    "type": CLEAR_ON_LOGOUT
});

const appReducer = combineReducers({
        user,
        conversations,
        activeConversation
    }),
    rootReducer = (state, action) => {

        if (action.type === CLEAR_ON_LOGOUT) {

            // Set state to initial state
            state = undefined;

        }
        return appReducer(
            state,
            action
        );

    };

export default createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
