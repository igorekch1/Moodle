import { FETCH_TOPICS, CREATE_TOPIC, CURRENT_TOPIC} from "../actions/types";

const initialState = {
    allTopics: [],
    topicItem: {},
    currentTopic: {},
    currentId: null,
    currentName: ''
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
                // currentId: action.payload[0],
                // currentName: action.payload[1]
            }
        
        default:
            return state;
    }
}