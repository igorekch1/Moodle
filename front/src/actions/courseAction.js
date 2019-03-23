import { FETCH_COURSES, CREATE_COURSE } from "./types";

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