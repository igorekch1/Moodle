import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import courseReducer from "./courseReducer";
import topicReducer from "./topicReducer";
import testReducer from "./testReducer";

export default combineReducers({
    login: loginReducer,
    course: courseReducer,
    topic: topicReducer,
    test: testReducer
})