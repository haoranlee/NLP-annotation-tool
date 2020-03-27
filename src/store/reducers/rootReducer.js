import authReducer from './authReducer';
import articleReducer from './articleReducer';
import userCompleteCountReducer from './userCompleteCountReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    article: articleReducer,
    userCompleteCount: userCompleteCountReducer,
    firebase: firebaseReducer
});

export default rootReducer;