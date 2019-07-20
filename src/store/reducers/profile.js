import { LOAD_PROFILE, SET_FAIL_PROFILE, RESET_APP_STATE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILED, CLEAR_RESPONSE_CODE } from "../constants";

const initialState = {
    profile: null,
    profileFetchResponse: -1,
    profileEditResponse: -1
}

export const reducer = (state = initialState, action) => {

    switch(action.type) {
        case LOAD_PROFILE:
            return {
                profileEditResponse: -1,
                profile: action.payload,
                profileFetchResponse: 0
            }
        case SET_FAIL_PROFILE:
            return {
                ...state,
                profileFetchResponse: action.payload
            }
        case EDIT_PROFILE_SUCCESS:
            return {
                profileFetchResponse: -1,
                profile: action.payload,
                profileEditResponse: 0
            }
        case EDIT_PROFILE_FAILED:
            return {
                ...state,
                profileEditResponse: action.payload
            }
        case CLEAR_RESPONSE_CODE: 
            return initialState;
        case RESET_APP_STATE: 
            return initialState
        default: 
            return state;
    }
}

export default reducer;