import { SET_LOGGED_IN, SET_CODE } from '../constants';
import { uiStartLoading, uiStopLoading } from './ui';

export const login = (authData) => (dispatch) => {

    dispatch(uiStartLoading());

    fetch('https://chat-time-api.herokuapp.com/signIn', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email: authData.email,
            pw: authData.password
        })
    })
    .catch(err => {
        console.log(err);
        alert(err);
        dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(res => {

        if (res.code === 0) {
            dispatch({ 
                type : SET_LOGGED_IN, 
                payload : { 
                    user : res.user 
                } 
            });
        }
        else {
            dispatch({ type: SET_CODE , payload: res.code });
        }
        dispatch(uiStopLoading());
    })
};