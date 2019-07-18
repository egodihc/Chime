import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';
import messengerReducer from './reducers/messenger';
import profileReducer from './reducers/profile';

const rootReducer = combineReducers({
    ui : uiReducer,
    auth : authReducer,
    messenger: messengerReducer,
    profile: profileReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;