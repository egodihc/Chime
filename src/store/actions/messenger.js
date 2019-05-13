import { uiStartLoading, uiStopLoading } from "./ui";
import { LOAD_LIST, LOAD_MESSAGES } from "../constants";

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


export const getMessages = (config) => (dispatch) => {
    
    dispatch(uiStartLoading());

    fetch('https://chat-time-api.herokuapp.com/getMessages', {
        method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
            sender: config.sender,
            destination: config.destination,
            isGroup: config.isGroup,
            pw: config.pw
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.code === 0) {
            dispatch({ type: LOAD_MESSAGES, payload: res.messages });
        }
        dispatch(uiStopLoading());
    })
    .catch(err => {
        dispatch(uiStopLoading());
    });

}


export const sendMessage = (config) => (dispatch) => {


    fetch('https://chat-time-api.herokuapp.com/sendMessage', {
        method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
            sender: config.sender,
            destination: config.destination,
            message: config.message,
            isGroup: config.isGroup,
            pw: config.pw,
            isFile: false
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.code === 0) {
            dispatch(getMessages(config));
        }
        else {
            // TODO:
            // Handle message not sent error in the UI
            alert(res.code);
        }
    })
    .catch(err => {
        // TODO:
        // Replace this error notification with more elegant UI solution
        alert('Error: Message not sent');
    });

}