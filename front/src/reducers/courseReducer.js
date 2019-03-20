import { FETCH_COURSES, CREATE_COURSE } from "../actions/types";

const initialState = {
    allCourses: [],
    courseItem: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_COURSES:
            return {
                ...state,
                allCourses: action.payload
            }

        case CREATE_COURSE:
            return {
                ...state,
                courseItem: action.payload
            }

        default:
            return state;
    }
}