import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import listReducer from './reducers/list';
import messengerReducer from './reducers/messenger';
import profileReducer from './reducers/profile';
import themeReducer from './reducers/theme';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
    ui : uiReducer,
    auth : authReducer,
    messenger: messengerReducer,
    profile: profileReducer,
    list: listReducer,
    theme: themeReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;