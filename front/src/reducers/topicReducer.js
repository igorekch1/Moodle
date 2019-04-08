import { FETCH_TOPICS, 
         CREATE_TOPIC, 
         CURRENT_TOPIC, 
         RESET_CURRENT_TOPIC, 
         DELETE_TOPIC 
        } from "../actions/types";

const initialState = {
    allTopics: [],
    topicItem: {},
    currentTopic: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_TOPICS:
            return {
                ...state,
                allTopics: action.payload
            }

        case CREATE_TOPIC: 
            return {
                ...state,
                topicItem: action.payload
            }
        
        case CURRENT_TOPIC:
            return {
                ...state,
                currentTopic: action.payload
            }

        case RESET_CURRENT_TOPIC:
            return {
                ...state,
                currentTopic: null
            }

        case DELETE_TOPIC:
        if (action.payload.removed) {
            state.allTopics = state.allTopics.filter(({id}) => id != action.payload.id)
            return {
                ...state,
                currentTopic: null
            }
        }

        default:
            return state;
    }
}