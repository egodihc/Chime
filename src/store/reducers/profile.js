import { LOAD_PROFILE, SET_FAIL_PROFILE, RESET_APP_STATE } from "../constants";

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
        case RESET_APP_STATE: 
            return initialState
        default: 
            return state;
    }
}

export default reducer;