import { uiStartLoading, uiStopLoading } from "./ui";
import { LOAD_LIST, LOAD_MESSAGES, ADDRESS, CLEAR_DISABLE_CARD, SET_DISABLE_CARD, SET_TARGET } from "../constants";

export const getList = (authData) => (dispatch) => {

    dispatch(uiStartLoading());

    fetch(`${ADDRESS}/getList`, {
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
            console.log(res.users);
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

    fetch(`${ADDRESS}/getMessages`, {
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


    fetch(`${ADDRESS}/sendMessage`, {
        method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
            sender: config.sender,
            destination: config.destination,
            message: config.message,
            isGroup: config.isGroup,
            pw: config.pw,
            isFile: config.isFile
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

export const clearDisable = () => {
    return {
        type : CLEAR_DISABLE_CARD
    }
}

export const setDisable = () => {
    return {
        type : SET_DISABLE_CARD
    }
}

export const loadList = (list) => {
    return {
        type: LOAD_LIST,
        payload: list
    }
}

export const setTarget = (target) => {
    return {
        type: SET_TARGET,
        payload: target
    }
}