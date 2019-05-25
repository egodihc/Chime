import { LOAD_LIST, LOAD_MESSAGES, CLEAR_MESSAGES, CLEAN_MESSAGES, TEMP_MESSAGE } from "../constants";


const initialState = {
    list: [],
    messages: [],
    messagesLoaded : true,
    tempMessages: []
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
        case TEMP_MESSAGE:
            let tempMessages = state.tempMessages;
            tempMessages.push(action.payload);
            return {
                ...state,
                tempMessages: tempMessages
            }
        default:
            return state;
    }
}

export default reducer;