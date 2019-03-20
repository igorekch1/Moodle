import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootRecuers from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootRecuers,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;