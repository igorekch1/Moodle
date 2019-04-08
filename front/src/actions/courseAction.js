import { FETCH_COURSES, 
            CREATE_COURSE, 
            UPDATE_COURSE,
            RESET_CURRENT_COURSEID, 
            SET_CURRENT_COURSEID, 
            DELETE_COURSE,
            SET_CURRENT_COURSE,
            RESET_CURRENT_COURSE 
        } from "./types";

export const set_current_course = (course) => dispatch => {
    dispatch({
        type: SET_CURRENT_COURSE,
        payload: course
    })
}

export const reset_current_course = () => dispatch => {
    console.log("reseted")
    dispatch({
        type: RESET_CURRENT_COURSE
    })
}

export const set_current_courseId = (id) => dispatch => {
    dispatch({
        type: SET_CURRENT_COURSEID,
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

export const update_course = (course) => dispatch => {
    fetch(`http://localhost:5000/courses/update`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({
            id: course.id,
            name: course.name,
            description: course.description
        })
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: UPDATE_COURSE,
            payload: data
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