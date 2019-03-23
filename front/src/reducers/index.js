import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import courseReducer from "./courseReducer";
import topicReducer from "./topicReducer";

export default combineReducers({
    login: loginReducer,
    course: courseReducer,
    topic: topicReducer
})