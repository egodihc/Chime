import { uiStartLoading, uiStopLoading } from "./ui";
import { LOAD_LIST } from "../constants";

export const getList = (authData) => (dispatch) => {

    dispatch(uiStartLoading());

    fetch('https://chat-time-api.herokuapp.com/getList', {
        method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			id: authData.id,
            pw: authData.pw
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.code === 0) {
            dispatch({ type: LOAD_LIST, payload: res.users });
        }
        else {
            dispatch(uiStopLoading());
        }
    })
    .catch(err => {
        dispatch(uiStopLoading());
    });

}