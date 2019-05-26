import { CHANGE_THEME } from "../constants";

const initialState = {
    theme: 'LIGHT'
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case CHANGE_THEME: 
            return {
                ...state,
                theme: (state.theme === 'LIGHT') ? 'DARK' : 'LIGHT'
            }
        default:
            return state;
    }
}

export default reducer;