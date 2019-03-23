import { FETCH_TOPICS, CREATE_TOPIC, CURRENT_TOPIC } from "./types";

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

export const create_topics = (name, content, id) => dispatch => {
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
        console.log(topic)
        dispatch({
            type: CREATE_TOPIC,
            payload: topic
        })
    })
}