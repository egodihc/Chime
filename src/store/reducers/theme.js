import { TOGGLE_THEME, RESET_APP_STATE, SET_THEME } from "../constants";

const initialState = {
    theme: 'LIGHT'
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case TOGGLE_THEME:
            return {
                theme: state.theme === 'LIGHT'? 'DARK' : 'LIGHT'
            }
        case SET_THEME:
            return {
                theme: action.payload
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;