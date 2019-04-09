import { FETCH_TESTS, CREATE_TEST, DELETE_TEST, SET_CURRENT_TEST, UPDATE_TEST, CREATE_QUESTION, FETCH_QUESTIONS} from "../actions/types";

const initialState = {
    allTests: [],
    testItem: {},
    currentTest: null,
    allQuestions: [],
    questionItem: {}
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
                testItem: action.payload,
                currentTest: null
            }

        case DELETE_TEST:
            if (action.payload.removed) {
                state.allTests = state.allTests.filter(({id}) => id != action.payload.id)
                return {
                    ...state,
                    currentTest: null
                }
            }

        case SET_CURRENT_TEST:
            return {
                ...state,
                currentTest: action.payload,
                testItem: {}
            }
        
        case UPDATE_TEST:
            state.allTests.map(test => {
                if (test.id === action.payload.id) {
                    test.name = action.payload.name
                }
            })
            return {
                ...state
            } 
        
        case FETCH_QUESTIONS:
            return {
                ...state,
                allQuestions: action.payload
            }
        
        case CREATE_QUESTION:
            return {
                ...state,
                questionItem: action.payload
            }
        
        default:
            return state;
    }
}
