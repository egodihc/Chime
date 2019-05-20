import { CHANGE_THEME } from "../constants";

const initialState = {
    theme: 'BLUE'
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case CHANGE_THEME: 
            return {
                ...state,
                theme: (state.theme === 'BLUE') ? 'orange' : 'BLUE'
            }
        default:
            return state;
    }
}

export default reducer;