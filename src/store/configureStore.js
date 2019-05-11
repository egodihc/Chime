import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({

});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;