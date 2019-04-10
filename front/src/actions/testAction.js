import { TEST_RESULT, FETCH_TESTS, CREATE_TEST, SET_CURRENT_TEST, DELETE_TEST, UPDATE_TEST, FETCH_QUESTIONS, CREATE_QUESTION } from "./types";

export const set_current_test = (test) => dispatch => {
    dispatch({
        type: SET_CURRENT_TEST,
        payload: test
    })
}

export const create_test = (name, description, time, topicId) => dispatch => {
    fetch(`/tests/${topicId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            name,
            description,
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
    fetch(`/tests/${id}`)
    .then(res => res.json())
    .then(tests => {
        dispatch({
            type: FETCH_TESTS,
            payload: tests
        })
    })
}

export const delete_test = (id) => dispatch => {
    fetch(`/tests/del`, {
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
            type: DELETE_TEST,
            payload: data
        })
    })
}

export const update_test = (id,name) => dispatch => {
    fetch(`/tests/update`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({
            id,
            name
        })
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: UPDATE_TEST,
            payload: data
        })
    })
}

export const fetch_questions = (id) => dispatch => {
    fetch(`/questions/${id}`)
    .then(res => res.json())
    .then(question => {
        dispatch({
            type: FETCH_QUESTIONS,
            payload: question
        })
    })
}

export const create_question = (text, answers, testId) => dispatch => {
    fetch(`/questions/${testId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            text,
            answers
        })
    })
    .then(res => res.json())
    .then(question => {
        dispatch({
            type: CREATE_QUESTION,
            payload: question
        })
    })
}

export const send_answers = (answers) => dispatch => {
    fetch("/testresult", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            answers
        })
    })
    .then(data => data.json())
    .then(res => {
        dispatch({
            type: TEST_RESULT,
            payload: res
        })
    })
}