import { LOGIN, SIGNUP, LOGOUT, WHOAMI } from "../actions/types";

const initialState = {
    loggedIn : false,
    errorOccured: false,
    userId : null,
    userName: null,
    userRole: null
}

export default function(state = initialState, action) {
    switch(action.type) {

        case LOGIN :
        console.log(action.payload)
        if (action.payload.loggedIn) {
            return {
                ...state,
                loggedIn: true,
                errorOccured: false,
                userId: action.payload.id,
                userName: action.payload.login,
                userRole: action.payload.role
            }
        } else {
            return {
                ...state,
                loggedIn: false,
                errorOccured: false,
                userId: null
            }
        }

        case SIGNUP :
        if (action.payload.created) {
            return {
                ...state,
                loggedIn: false,
                errorOccured: false
            }
        } else {
            return {
                ...state,
                loggedIn: false,
                errorOccured: true
            }
        }

        case LOGOUT:
            if (action.payload.session == "erased") {

                return {
                    ...state,
                    loggedIn: false,
                    errorOccured: false,
                    userId: null,
                    userName: null,
                    userRole: null
                }
            }

        case WHOAMI:
            if (action.payload.session !== "empty") {
                return {
                    ...state,
                    loggedIn: true,
                    errorOccured: false,
                    userId: action.payload.id,
                    userName: action.payload.login,
                    userRole: action.payload.role
                }
            } else {
                return {
                    ...state,
                    loggedIn: false,
                    errorOccurred: false,
                    userId: null
                }
            }

        default: 
            return state;
    } 
} 