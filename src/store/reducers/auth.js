import { SET_LOGGED_IN, SET_CODE, SET_TRANSITIONED, LOAD_USER } from '../constants';

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
        default:
            return state;
    }
}

export default reducer;