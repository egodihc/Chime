import { LOAD_LIST, LOAD_MESSAGES, CLEAR_MESSAGES, CLEAN_MESSAGES } from "../constants";


const initialState = {
    list: [],
    messages: [],
    messagesLoaded : true
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
        default:
            return state;
    }
}

export default reducer;