import { SET_LOGGED_IN, SET_CODE, SET_TRANSITIONED, LOAD_USER, RESET_APP_STATE } from '../constants';

const initialState = {
    isLoggedIn: false,
    user : null,
    alreadyTransitioned : false
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true,
                user : action.payload.user
            }
        case SET_CODE:
            return {
                ...state,
                code: action.payload
            }
        case SET_TRANSITIONED:
            return {
                ...state,
                alreadyTransitioned: true
            }
        case LOAD_USER:
            return {
                ...state,
                user: action.payload
            }
        case RESET_APP_STATE: 
            return initialState
        default:
            return state;
    }
}

export default reducer;