import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import courseReducer from "./courseReducer";

export default combineReducers({
    login: loginReducer,
    course: courseReducer
})