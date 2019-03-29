import { FETCH_TOPICS, CREATE_TOPIC, CURRENT_TOPIC, RESET_CURRENT_TOPIC, DELETE_TOPIC } from "./types";

export const reset_current_topic = () => dispatch => {
    dispatch({
        type: RESET_CURRENT_TOPIC
    })
}

export const set_current_topic = (topic) => dispatch => {
    dispatch({
        type: CURRENT_TOPIC,
        payload: topic
    })
}

export const fetch_topics = (id) => dispatch => {
    fetch(`http://localhost:5000/topics/${id}`)
    .then(res => res.json())
    .then(topics => {
        dispatch({
            type: FETCH_TOPICS,
            payload: topics
        })
    })
}

export const create_topic = (name, content, id) => dispatch => {
    fetch(`http://localhost:5000/topics/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            name,
            content
        })
    })
    .then(res => res.json())
    .then(topic => {
        dispatch({
            type: CREATE_TOPIC,
            payload: topic
        })
    })
}

export const delete_topic = id => dispatch => {
    fetch(`http://localhost:5000/topics/del`, {
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
            type: DELETE_TOPIC,
            payload: data
        })
    })
}