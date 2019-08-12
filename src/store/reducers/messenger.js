import { LOAD_MESSAGES, CLEAR_MESSAGES, CLEAN_MESSAGES, RESET_APP_STATE, LOAD_TARGET } from "../constants";


const initialState = {
    messages: [],
    messagesLoaded : true,
    tempMessages: [],
    target: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_MESSAGES:
            return {
                ...state,
                messages: action.payload,
                messagesLoaded: false
            }
        case CLEAR_MESSAGES:
            return {
                ...state,
                messagesLoaded: true
            }
        case CLEAN_MESSAGES: 
            return {
                ...state,
                messages: []
            }
        case LOAD_TARGET:
            console.log(action.payload, 'reducer')
            return {
                ...state,
                target: action.payload
            }
        case RESET_APP_STATE: 
            return initialState
        default:
            return state;
    }
}

export default reducer;