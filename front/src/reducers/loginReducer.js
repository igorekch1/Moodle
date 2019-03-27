import { LOGIN, SIGNUP, LOGOUT } from "../actions/types";

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
                loggedIn: true,
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
        console.log(action.payload)
        return {
            ...state,
            loggedIn: false,
            errorOccured: false,
            userId: null,
            userName: null,
            userRole: null
        }

        default: 
            return state;
    } 
} 