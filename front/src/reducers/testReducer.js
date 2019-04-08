import { FETCH_TESTS, CREATE_TEST } from "../actions/types";

const initialState = {
    allTests: [],
    testItem: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_TESTS:
            return {
                ...state,
                allTests: action.payload
            }

        case CREATE_TEST:
            return {
                ...state,
                testItem: action.payload
            }
        
        default:
            return state;
    }
}
