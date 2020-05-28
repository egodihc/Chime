import { LOGIN_SUCCESS, RESET_APP_STATE, CLEAR_AUTH_CODE, LOAD_USER } from '../constants';

const initialState = {
    authData: {
        username: "",
        password: ""
    },
    user: {
        username: "",
        picture: "",
        first: "",
        last: ""
    },
    code: -1
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_AUTH_CODE:
            return {
                ...state,
                code: -1
            }
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                authData: {
                    username: action.payload.username,
                    password: action.payload.password
                }
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;