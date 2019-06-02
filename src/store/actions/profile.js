import { ADDRESS, SET_FAIL_PROFILE, LOAD_PROFILE } from "../constants";

export const getProfile = (id) => (dispatch) => {

    /* Call the getProfile API */
	fetch(`${ADDRESS}/getProfile?user=${id}`, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
        if (data.code === 0) {
            dispatch({ type: LOAD_PROFILE, payload: data });
        }
        else {
            dispatch({ type: SET_FAIL_PROFILE, payload: data.code });
        }
		
	})
    .catch(err => dispatch({ type : SET_FAIL_PROFILE, payload : err }));
}