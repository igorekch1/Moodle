import { FETCH_COURSES, 
            CREATE_COURSE, 
            UPDATE_COURSE,
            RESET_CURRENT_COURSEID, 
            SET_CURRENT_COURSEID, 
            DELETE_COURSE,
            SET_CURRENT_COURSE,
            RESET_CURRENT_COURSE 
        } from "../actions/types";

const initialState = {
    allCourses: [],
    courseItem: {},
    currentCourse: {},
    courseId: null,
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

        case UPDATE_COURSE:
        console.log(action.payload)
        state.allCourses.map(course => {
            if (course.id === action.payload.id) {
                console.log(course)
                course.name = action.payload.name;
                course.description = action.payload.description
            }
        })
            return {
                ...state
            }   
            
        case SET_CURRENT_COURSEID:
            return {
                ...state,
                courseId: action.payload.id
            }    

        case RESET_CURRENT_COURSEID:
            return {
                ...state,
                courseId: null
            }

        case SET_CURRENT_COURSE:
            return {
                ...state,
                currentCourse: action.payload
            }
        
        case RESET_CURRENT_COURSE:
            return {
                ...state,
                currentCourse: {}
            }


        case DELETE_COURSE:
            if (action.payload.removed) {
                state.allCourses = state.allCourses.filter(({id}) => id != action.payload.id)
                return {
                    ...state,   
                    courseItem: {},
                    courseId: null
                }
            }

        default:
            return state;
    }
}