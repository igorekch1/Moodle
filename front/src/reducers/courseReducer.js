import { FETCH_COURSES } from "../actions/types";

const initialState = {
    allCourses: [],
    course: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_COURSES:
            return {
                ...state,
                allCourses: action.payload
            }

        default:
            return state;
    }
}