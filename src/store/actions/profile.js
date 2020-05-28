import { ADDRESS, LOAD_PROFILE, SET_FAIL_PROFILE, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_PENDING, UPDATE_PROFILE_SUCCESS } from "../constants";

export const getProfile = (target) => (dispatch) => {

    fetch(`${ADDRESS}/profile?username=${target}`, {
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
    dispatch({ type: UPDATE_PROFILE_PENDING });

    fetch(`${ADDRESS}/profile`, {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            ...config
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 0) {
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
        }
        else {
            dispatch({ type: UPDATE_PROFILE_FAIL, payload: data.code });
        }
    })
    .catch(err => dispatch({ type: UPDATE_PROFILE_FAIL, payload: err }));
}