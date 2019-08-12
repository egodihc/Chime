import { ADDRESS, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILED, SET_FAIL_PROFILE, LOAD_PROFILE, CLEAR_RESPONSE_CODE } from "../constants";

export const getProfile = (target) => (dispatch) => {

    fetch(`${ADDRESS}profile?username=${target}`, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(res => {
        if (res.code === 0) {
            dispatch({ type: LOAD_PROFILE, payload: res.user });
        }
        else {
            dispatch({ type : SET_FAIL_PROFILE, payload : res })
        }
    })
    .catch(err => dispatch({ type : SET_FAIL_PROFILE, payload : err }));

}


export const saveProfile = (config) => (dispatch) => {

    dispatch({ type: CLEAR_RESPONSE_CODE });

    fetch(`${ADDRESS}/saveProfile`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            ...config
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data['code'] === 0) {
            dispatch({ type: EDIT_PROFILE_SUCCESS, payload: data['profile'] });
        }
        else {
            dispatch({ type: EDIT_PROFILE_FAILED, payload: data['code'] });
        }
    })
    .catch(err => dispatch({ type: EDIT_PROFILE_FAILED, payload: err }));
}