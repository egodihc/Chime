import { ADDRESS, LIST_FAIL, LIST_SUCCESS, LOAD_LIST } from '../constants';

export const getList = (username) => (dispatch) => {
	/* Call the getList API */
	fetch(`${ADDRESS}/users?username=${username}`, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		if (data.code === 0) {
			if (data.users.length > 0) {
				dispatch({ type: LIST_SUCCESS, payload: data });
			}
		}
		else {
			dispatch({ type: LIST_FAIL, payload: data });
		}
	})
	.catch(err => dispatch({ type : LIST_FAIL, payload : err }));
}

export const loadList = (list) => {
	return {
		type: LOAD_LIST,
		payload: list
	}
}