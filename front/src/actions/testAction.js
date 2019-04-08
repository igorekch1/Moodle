import { FETCH_TESTS, CREATE_TEST } from "./types";

export const create_test = (name, time, topicId) => dispatch => {
    fetch(`http://localhost:5000/tests/${topicId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            name,
            time
        })
    })
    .then(res => res.json())
    .then(test => {
        dispatch({
            type: CREATE_TEST,
            payload: test
        })
    })
}

export const fetch_tests = (id) => async dispatch => {
    fetch(`http://localhost:5000/tests/${id}`)
    .then(res => res.json())
    .then(tests => {
        dispatch({
            type: FETCH_TESTS,
            payload: tests
        })
    })
}