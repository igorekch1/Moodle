import { FETCH_COURSES, CREATE_COURSE, RESET_CURRENT_COURSEID, SET_CURRENT_COURSE } from "../actions/types";

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
            
        case SET_CURRENT_COURSE:
            return {
                ...state,
                courseId: action.payload.id
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