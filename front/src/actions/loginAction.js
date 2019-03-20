import { LOGIN, SIGNUP, ERROR_OCCURED } from './types';

export const login = (login, password) => dispatch => {
    fetch("http://localhost:5000/login", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            login,
            password
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error("User doesn't exist");
        }
    })
    .then(data => {
        dispatch({
            type: LOGIN,
            payload: data
        });
    })
    .catch(err => {
        dispatch({
            type: ERROR_OCCURED,
            payload: err
        })
    })
}

export const signup = (login, password) => dispatch => {
    fetch("http://localhost:5000/signup", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            login,
            password
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error("User already exists");
        }
    })
    .then(data => {
        dispatch({
            type: SIGNUP,
            payload: data
        });
    })
    .catch(err => {
        dispatch({
            type: ERROR_OCCURED,
            payload: err
        })
    })
}