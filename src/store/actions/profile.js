import { ADDRESS, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILED, SET_FAIL_PROFILE, LOAD_PROFILE, CLEAR_RESPONSE_CODE } from "../constants";

export const getProfile = (id) => (dispatch) => {

    dispatch({ type: CLEAR_RESPONSE_CODE });

    /* Call the getProfile API */
	fetch(`${ADDRESS}/getProfile?user=${id}`, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
        if (data['code'] === 0) {
            dispatch({ type: LOAD_PROFILE, payload: data['profile'] });
        }
        else {
            dispatch({ type: SET_FAIL_PROFILE, payload: data['code'] });
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