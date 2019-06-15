import { LOAD_LIST, LOAD_MESSAGES, CLEAR_MESSAGES, CLEAN_MESSAGES, SET_DISABLE_CARD, CLEAR_DISABLE_CARD } from "../constants";


const initialState = {
    list: [],
    messages: [],
    messagesLoaded : true,
    tempMessages: [],
    disabled: false
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
        case SET_DISABLE_CARD:
            return {
                ...state,
                disabled: true                
            }
        case CLEAR_DISABLE_CARD:
            return {
                ...state,
                disabled: false
            }
        default:
            return state;
    }
}

export default reducer;