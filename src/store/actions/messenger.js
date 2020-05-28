import { uiStartLoading, uiStopLoading } from "./ui";
import { LOAD_MESSAGES, ADDRESS, CLEAR_DISABLE_CARD, SET_DISABLE_CARD, LOAD_TARGET } from "../constants";

export const getMessages = (config) => (dispatch) => {
    
    dispatch(uiStartLoading());
    
    fetch(`${ADDRESS}/messages/fetch`, {
        method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
            sender: config.sender,
            destination: config.destination,
            password: config.password
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


    fetch(`${ADDRESS}/messages/send`, {
        method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
            sender: config.sender,
            destination: config.destination,
            message: config.message,
            password: config.password,
            isImage: config.isImage
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

export const loadTarget = (target) => {
    return {
        type: LOAD_TARGET,
        payload: target
    }
}