import { TOGGLE_THEME, SET_THEME } from "../constants";

const initialState = {
    theme: 'LIGHT'
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case TOGGLE_THEME: 
            return {
                ...state,
                theme: (state.theme === 'LIGHT') ? 'DARK' : 'LIGHT'
            }
        default:
            return state;
    }
}

export default reducer;