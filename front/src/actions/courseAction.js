import { FETCH_COURSES } from "./types";

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