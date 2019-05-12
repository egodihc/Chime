import { LOAD_LIST } from "../constants";


const initialState = {
    list: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_LIST:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state;
    }
}

export default reducer;