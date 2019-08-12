import { uiStartLoading, uiStopLoading } from './ui';

import { ADDRESS, LOGIN_FAIL, LOGIN_SUCCESS, LOAD_USER } from '../constants';

export const login = (authData) => (dispatch) => {

    dispatch(uiStartLoading());
    
	fetch(ADDRESS + 'auth/login', {
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			...authData
		}),
		method : 'post'
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		const userData = {
			...data,
			authData: {
				...authData
			}
		}
        dispatch({ type: LOGIN_SUCCESS, payload: userData});
        dispatch(uiStartLoading());
	})
	.catch(err => {
        dispatch(uiStopLoading());
        dispatch({ type: LOGIN_FAIL, payload: err })
    });
}

export const loadUser = (user) => {
    return {
        type: LOAD_USER,
        payload: user
    }
}