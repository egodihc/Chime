import { LOAD_PROFILE, SET_FAIL_PROFILE, RESET_APP_STATE, CLEAR_RESPONSE_CODE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_PENDING } from "../constants";

const initialState = {
    profile: null,
    profileFetchResponse: -1,
    profileEdiState: null
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
        case UPDATE_PROFILE_PENDING:
            return {
                ...state,
                profileFetchResponse: -1,
                profileEditState: 'PENDING'
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                profileFetchResponse: -1,
                profile: action.payload,
                profileEditState: 'SUCCESS'
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                profileEditState: 'FAIL'
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