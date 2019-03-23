import { FETCH_COURSES, CREATE_COURSE, RESET_CURRENT_COURSEID } from "../actions/types";

const initialState = {
    allCourses: [],
    courseItem: {},
    courseId: null
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

        case RESET_CURRENT_COURSEID:
            return {
                ...state,
                courseId: null
            }

        default:
            return state;
    }
}