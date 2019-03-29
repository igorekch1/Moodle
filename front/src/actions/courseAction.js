import { FETCH_COURSES, 
            CREATE_COURSE, 
            RESET_CURRENT_COURSEID, 
            SET_CURRENT_COURSE, 
            DELETE_COURSE 
        } from "./types";

export const set_current_courseId = (id) => dispatch => {
    dispatch({
        type: SET_CURRENT_COURSE,
        payload: {id}
    })
}

export const reset_current_courseid = () => dispatch => {
    dispatch({
        type: RESET_CURRENT_COURSEID
    })
}

export const fetch_courses = () => dispatch => {
    fetch("http://localhost:5000/courses")
    .then(res => res.json())
    .then(courses => {
        dispatch({
            type: FETCH_COURSES,
            payload: courses
        })
    })
}

export const create_course = (name, description) => dispatch => {
    fetch("http://localhost:5000/courses", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            name,
            description
        })
    })
    .then(res => res.json())
    .then(course => {
        dispatch({
            type: CREATE_COURSE,
            payload: course
        })
    })
}

export const delete_course = id => dispatch => {
    fetch(`http://localhost:5000/courses/del`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify({id})
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: DELETE_COURSE,
            payload: data
        })
    })
}