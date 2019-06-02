import { LOAD_PROFILE, SET_FAIL_PROFILE } from "../constants";

const initialState = {
    profile: null,
    profileFetchResponse: -1 
}

export const reducer = (state = initialState, action) => {

    switch(action.type) {
        case LOAD_PROFILE:
            return {
                ...state,
                profile: action.payload,
                profileFetchResponse: 0
            }
        case SET_FAIL_PROFILE:
            return {
                ...state,
                profileFetchResponse: action.payload
            }
        default: 
            return state;
    }
}

export default reducer;