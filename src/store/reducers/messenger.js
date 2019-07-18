import { LOAD_LIST, LOAD_MESSAGES, CLEAR_MESSAGES, CLEAN_MESSAGES, SET_TARGET, RESET_APP_STATE } from "../constants";


const initialState = {
    list: [],
    messages: [],
    messagesLoaded : true,
    tempMessages: [],
    target: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_LIST:
            return {
                ...state,
                list: action.payload
            }
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
        case SET_TARGET:
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